from post.models import *
from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from django.utils.timesince import timesince

class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    hashtags = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    time_ago = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    user_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'username', 'caption', 'image', 'image_url', 'time_ago',
                  'likes_count', 'comments_count', 'hashtags', 'comments', 'user_liked']

    def create(self, validated_data):
        return Post.objects.create(user=self.context['request'].user, **validated_data)

    def get_username(self, obj):
        return obj.user.username
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and obj.image.url:
            image_url = obj.image.url
            return request.build_absolute_uri(image_url) if request else image_url
        return None

    def get_likes_count(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return Like.objects.filter(content_type=content_type, object_id=obj.id).count()

    def get_comments_count(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return Comment.objects.filter(content_type=content_type, object_id=obj.id).count()

    def get_hashtags(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return list(Hashtag.objects.filter(content_type=content_type, object_id=obj.id).values_list('tag', flat=True))

    def get_time_ago(self, obj):
        time_diff = timesince(obj.created_at, timezone.now())
        return "Just now" if time_diff == "0 minutes" else f"{time_diff} ago"

    def get_comments(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        comments = Comment.objects.filter(content_type=content_type, object_id=obj.id)
        return CommentSerializer(comments, many=True, context=self.context).data
    
    def get_user_liked(self, obj):
        return Like.objects.filter(
            content_type=ContentType.objects.get_for_model(obj),
            object_id=obj.id,
            user=self.context['request'].user
        ).exists()

class SavedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedPost
        fields = "__all__"

class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = "__all__"

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    time_ago = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'username', 'commented_text', 'time_ago', 'likes_count', 'is_owner']

    def get_username(self, obj):
        return obj.user.username if obj.user else None
    
    def get_is_owner(self, obj):
        request = self.context.get('request')
        return bool(request and request.user == obj.user)

    def get_likes_count(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return Like.objects.filter(content_type=content_type, object_id=obj.id).count()

    def get_time_ago(self, obj):
        time_diff = timesince(obj.created_at, timezone.now())
        return "Just now" if time_diff == "0 minutes" else f"{time_diff} ago"
