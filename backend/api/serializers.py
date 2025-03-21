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
    user_followers = serializers.SerializerMethodField()
    user_following = serializers.SerializerMethodField()
    post_num = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['user_id', 'username', 'email', 'bio', 'gender', 'profile_pic', 'user_followers', 'user_following', 'post_num']

    def get_user_followers(self,obj):
        return Followers.objects.filter(following=obj).count()

    def get_user_following(self,obj):
        return Followers.objects.filter(follower=obj).count()

    def get_post_num(self,obj):
        return Post.objects.filter(user=obj).count()

class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    hashtags = serializers.SerializerMethodField()
    images = serializers.ListField(child=serializers.ImageField(), write_only=True, required=False)
    image_urls = serializers.SerializerMethodField(read_only=True)
    views = serializers.IntegerField(default=0, read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Post
        fields = ['post_id', 'user', 'caption', 'created_at', 'likes_count', 'comments_count', 
                  'hashtags', 'views', 'images', 'image_urls']

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        post = Post.objects.create(**validated_data)

        # Save images to PostImage model
        PostImage.objects.bulk_create([
            PostImage(post=post, image=image) for image in images_data
        ])

        return post

    def get_image_urls(self, obj):
        return [img.image.url for img in obj.images.all()]

    def get_likes_count(self, obj):
        return Like.objects.filter(post=obj).count()

    def get_comments_count(self, obj):
        return Comment.objects.filter(post=obj).count()

    def get_hashtags(self, obj):
        return list(Hashtag.objects.filter(post=obj).values_list('tag', flat=True))

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