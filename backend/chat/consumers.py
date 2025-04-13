import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from chat.models import ChatRoom, ChatMessage
from user.models import CustomUser, OnlineUser


class ChatConsumer(AsyncWebsocketConsumer):

    @database_sync_to_async
    def get_user(self, user_id):
        return CustomUser.objects.get(id=user_id)

    @database_sync_to_async
    def get_user_rooms(self, user_id):
        return list(ChatRoom.objects.filter(members=user_id))

    @database_sync_to_async
    def get_online_users(self):
        return [online_user.user.id for online_user in OnlineUser.objects.all()]

    @database_sync_to_async
    def add_online_user(self, user):
        OnlineUser.objects.get_or_create(user=user)

    @database_sync_to_async
    def delete_online_user(self, user):
        OnlineUser.objects.filter(user=user).delete()

    @database_sync_to_async
    def save_message(self, message, user_id, room_id):
        user = CustomUser.objects.get(id=user_id)
        chat_room = ChatRoom.objects.get(id=room_id)
        chat_message = ChatMessage.objects.create(chat=chat_room, user=user, message=message)
        return {
            'action':'message',
            'userid': user_id,
            'roomid': room_id,
            'message': message,
            'name': f"{user.first_name} {user.last_name}".strip(),
            'image': user.image.url if user.image else None,
            'timestamp': str(chat_message.timestamp),
        }

    # -------------------- WebSocket Handlers --------------------

    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['userid']
        self.user = await self.get_user(self.user_id)
        self.user_rooms = await self.get_user_rooms(self.user_id)

        for room in self.user_rooms:
            await self.channel_layer.group_add(f'{room.id}', self.channel_name) # type:ignore

        await self.channel_layer.group_add('online_user', self.channel_name) # type:ignore

        await self.add_online_user(self.user)
        await self.send_online_user_list()

        await self.accept()

    async def disconnect(self, close_code):
        await self.delete_online_user(self.user)
        await self.send_online_user_list()

        for room in self.user_rooms:
            await self.channel_layer.group_discard(f'{room.id}', self.channel_name) # type: ignore

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')
        room_id = data.get('roomid')

        if action == 'message':
            message = data.get('message')
            user_id = data.get('userid')
            chat_message = await self.save_message(message, user_id, room_id)
        elif action == 'typing':
            chat_message = data
        else:
            return

        await self.channel_layer.group_send( # type:ignore
            f'{room_id}',
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
            'online_user',
            {
                'type': 'chat_message',
                'message': {
                    'action': 'online_user',
                    'userList': user_list
                }
            }
        )
