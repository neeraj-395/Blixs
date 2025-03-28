from rest_framework import serializers
from users.models import CustomUser
from users.models import Followers

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
        fields = [
                  'user_id', 'username', 'email', 'bio', 
                  'gender', 'profile_pic', 'user_followers', 
                  'user_following', 'post_num'
                 ]

    def get_user_followers(self,obj):
        return Followers.objects.filter(following=obj).count()

    def get_user_following(self,obj):
        return Followers.objects.filter(follower=obj).count()
    
class FollowersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followers
        fields = "__all__"