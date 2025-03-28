from api.models import *
from django.utils import timezone
from django.utils.timesince import timesince
from django.contrib.contenttypes.models import ContentType







class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = "__all__"

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"

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