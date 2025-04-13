from rest_framework import serializers
from chat.models import ChatRoom, ChatMessage
from user.serializers import UserSerializer

class ChatRoomSerializer(serializers.ModelSerializer):
	members = UserSerializer(many=True, read_only=True)
	member_ids = serializers.ListField(write_only=True)

	def create(self, validatedData):
		member_obj = validatedData.pop('member_ids')
		chat_room = ChatRoom.objects.create(**validatedData)
		chat_room.members.set(member_obj)
		return chat_room

	class Meta:
		model = ChatRoom
		fields = "__all__"

class ChatMessageSerializer(serializers.ModelSerializer):
	name = serializers.SerializerMethodField()
	userid = serializers.IntegerField(source='user.id', read_only=True)
	image = serializers.ImageField(source='user.image', read_only=True)

	class Meta:
		model = ChatMessage
		exclude = ['id', 'chat', 'user']

	def get_name(self, obj):
		return f"{obj.user.first_name} {obj.user.last_name}".strip()