from post.models import *
from rest_framework import serializers
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from django.utils.timesince import timesince

class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    hashtags = serializers.SerializerMethodField()
    images = serializers.ListField(child=serializers.ImageField(), write_only=True, required=False)
    image_urls = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField()
    time_ago = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'user', 'caption', 'time_ago' , 'likes_count',
                  'comments_count', 'hashtags', 'images', 'image_urls' , 'comments' ]

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        post = Post.objects.create(**validated_data)

        # Save images to PostImage model
        PostImage.objects.bulk_create([
            PostImage(post=post, image=image) for image in images_data
        ])

        return post

    def get_user(self, obj):
        return obj.user.username

    def get_image_urls(self, obj):
        return [img.image.url for img in obj.images.all()]

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
        # Get only parent comments related to the post
        content_type = ContentType.objects.get_for_model(obj)
        parent_comments = Comment.objects.filter(content_type=content_type, object_id=obj.id, parent=None)
        return CommentSerializer(parent_comments, many=True).data

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
    replies = serializers.SerializerMethodField()
    user = "None"
    likes_count = serializers.SerializerMethodField()
    time_ago = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['object_id', 'user', 'commented_text', 'time_ago', 'likes_count', 'replies']

    def get_replies(self, obj):
        # Recursively fetch and serialize replies
        replies = obj.replies.all()
        return CommentSerializer(replies, many=True).data

    def get_likes_count(self, obj):
        content_type = ContentType.objects.get_for_model(obj)
        return Like.objects.filter(content_type=content_type, object_id=obj.id).count()

    def get_time_ago(self, obj):
        time_diff = timesince(obj.created_at, timezone.now())
        return "Just now" if time_diff == "0 minutes" else f"{time_diff} ago"
