from rest_framework import serializers
from api.models import *
from django.contrib.contenttypes.models import ContentType

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'bio', 'gender', 'profile_pic']

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            bio=validated_data.get('bio', ''),
            gender=validated_data.get('gender', 'P'),
            profile_pic=validated_data.get('profile_pic', None)
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser  
        fields = ['username', 'email', 'bio', 'gender', 'profile_pic']


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['id', 'image']


class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    hashtags = serializers.SerializerMethodField()
    images = PostImageSerializer(many=True, required=False)
    views = serializers.IntegerField(default=0, read_only=True)

    class Meta:
        model = Post
        fields = ['post_id', 'user', 'images' , 'caption', 'created_at', 'likes_count', 'comments_count', 'hashtags', 'views']
        
    def create(self, validated_data):
        images_data = self.context['request'].FILES.getlist('images')
        post = Post.objects.create(**validated_data)

        for image in images_data:
            PostImage.objects.create(post=post, image=image)

        return post
        
    def get_likes_count(self, obj):
        post_type = ContentType.objects.get_for_model(Post)
        return Like.objects.filter(content_type=post_type, object_id=obj.post_id).count()
    
    def get_comments_count(self, obj):
        post_type = ContentType.objects.get_for_model(Post)
        return Comment.objects.filter(content_type=post_type, object_id=obj.post_id).count()
    
    def get_hashtags(self, obj):
        post_type = ContentType.objects.get_for_model(Post)
        return list(Hashtag.objects.filter(content_type=post_type, object_id=obj.post_id).values_list('tag', flat=True))

class HashtagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hashtag
        fields = "__all__"

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

class SavedPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedPost
        fields = "__all__"

class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followers
        fields = "__all__"

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