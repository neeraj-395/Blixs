import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from chats.models import ChatRoom, ChatMessage
from users.models import CustomUser, OnlineUser


class ChatConsumer(AsyncWebsocketConsumer):

    # -------------------- DB Methods --------------------

    @database_sync_to_async
    def get_user(self, user_id):
        return CustomUser.objects.get(id=user_id)

    @database_sync_to_async
    def get_user_rooms(self, user_id):
        return list(ChatRoom.objects.filter(member=user_id))

    @database_sync_to_async
    def get_online_users(self):
        return [online_user.user.user_id for online_user in OnlineUser.objects.all()]

    @database_sync_to_async
    def add_online_user(self, user):
        OnlineUser.objects.get_or_create(user=user)

    @database_sync_to_async
    def delete_online_user(self, user):
        OnlineUser.objects.filter(user=user).delete()

    @database_sync_to_async
    def save_message(self, message, user_id, room_id):
        user = CustomUser.objects.get(user_id=user_id)
        chat_room = ChatRoom.objects.get(id=room_id)
        chat_message = ChatMessage.objects.create(chat=chat_room, user=user, message=message)
        return {
            'action': 'message',
            'userid': user_id,
            'roomid': room_id,
            'message': message,
            'image': user.profile_pic.url if user.profile_pic else '',
            'username': user.username,
            'timestamp': str(chat_message.timestamp),
        }

    # -------------------- WebSocket Handlers --------------------

    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['userId']
        self.user = await self.get_user(self.user_id)
        self.user_rooms = await self.get_user_rooms(self.user_id)

        for room in self.user_rooms:
            await self.channel_layer.group_add(room.roomId, self.channel_name) # type:ignore

        await self.channel_layer.group_add('onlineUser', self.channel_name) # type:ignore

        await self.add_online_user(self.user)
        await self.send_online_user_list()

        await self.accept()

    async def disconnect(self, close_code):
        await self.delete_online_user(self.user)
        await self.send_online_user_list()

        for room in self.user_rooms:
            await self.channel_layer.group_discard(room.roomId, self.channel_name) # type: ignore

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')
        room_id = data.get('roomId')

        if action == 'message':
            message = data.get('message')
            user_id = data.get('user')
            chat_message = await self.save_message(message, user_id, room_id)
        elif action == 'typing':
            chat_message = data
        else:
            return

        await self.channel_layer.group_send( # type:ignore
            room_id,
            {
                'type': 'chat_message',
                'message': chat_message
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event['message']))

    # -------------------- Helper Methods --------------------

    async def send_online_user_list(self):
        user_list = await self.get_online_users()
        await self.channel_layer.group_send( # type:ignore
            'onlineUser',
            {
                'type': 'chat_message',
                'message': {
                    'action': 'onlineUser',
                    'userList': user_list
                }
            }
        )
