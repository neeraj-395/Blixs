from rest_framework import serializers
from user.models import CustomUser
from user.models import Followers
from post.models import Post

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'bio', 'gender', 'image']

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            bio=validated_data.get('bio', ''),
            gender=validated_data.get('gender', 'O'),
            image=validated_data.get('image', None)
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    followers = serializers.SerializerMethodField()
    followings = serializers.SerializerMethodField()
    post_count = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'email', 'bio', 
            'gender', 'image', 'followers',
            'followings', 'post_count'
        ]

    def get_followers(self, obj):
        return Followers.objects.filter(following=obj).count()

    def get_followings(self, obj):
        return Followers.objects.filter(follower=obj).count()
    
    def get_post_count(self, obj):
        return Post.objects.filter(user=obj).count()
    
class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followers
        fields = "__all__"