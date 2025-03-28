from rest_framework import serializers
from messages.models import Message

class MessageSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    forward_from = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = "__all__"

    def get_replies(self, obj):
        return MessageSerializer(obj.replies.all(), many=True).data

    def get_forward_from(self, obj):
        return MessageSerializer(obj.forward_from).data if obj.forward_from else None