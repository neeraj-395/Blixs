from rest_framework import serializers
from user.models import CustomUser, Follow
from post.models import Post

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'username', 'password', 'email']

    def create(self, validated_data):
        user = CustomUser(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    followings_count = serializers.SerializerMethodField()
    posts_count = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            'id', 'name', 'username', 'email', 'bio',
            'gender', 'image_url', 'followers_count',
            'followings_count', 'posts_count'
        ]

    def get_name(self, user):
        return f"{user.first_name} {user.last_name}".strip()
    
    def get_image_url(self, user):
        request = self.context.get('request')
        if user.image and user.image.url:
            image_url = user.image.url
            return request.build_absolute_uri(image_url) if request else image_url
        return None

    def get_followers_count(self, user):
        return Follow.objects.filter(following=user).count()

    def get_followings_count(self, user):
        return Follow.objects.filter(follower=user).count()
    
    def get_posts_count(self, user):
        return Post.objects.filter(user=user).count()
    
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'bio', 'gender', 'image']

    
class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = "__all__"