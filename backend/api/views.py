from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import viewsets 
from api.models import *
from django.contrib.contenttypes.models import ContentType
from rest_framework import status
from django.shortcuts import get_object_or_404k
from api.serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView
from rest_framework.permissions import IsAuthenticated , AllowAny


# Custom Token Obtain Pair View
class CoustomTokenObtainPairView(TokenObtainPairView):  
    def post(self , req , *args , **kwargs):
        try:
          response = super().post(req , *args , **kwargs)
          token = response.data

          access_token = token ['access']
          refresh_token = token ['refresh']

          res = Response()

          res.data = {'success' : True}

          res.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=True,
            samesite='None',
            path='/'
          )

          res.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite='None',
            path='/'
          )


          return res
        except:
          return Response({'success': False})


# Custom Refresh Token View
class CoustomRefreshTokenView(TokenRefreshView):
  def post(self , req , *args , **kwargs):
    try:
      refresh_token = req.COOKIES.get('refresh_token')

      if not refresh_token:
         return Response({'refreshed': False, 'error': 'No refresh token found in cookies'}, status=400)

      req.data['refresh'] = refresh_token

      response = super().post(req , *args , **kwargs)

      tokens = response.data 
      access_token = tokens['access']
      
      res = Response()    

      res.data = {'refreshed' : True}   

      res.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite='None',
        path='/'
      )
      return res
    except:
      return Response({'refreshed' : False})




# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()  
        return Response(
            {"message": "User registered successfully!", "user_id": user.user_id},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout(req):
  try:
    res = Response()
    res.data = {'logout_success':True}
    res .delete_cookie('access_token' , path='/' , samesite='None') 
    res .delete_cookie('refresh_token' , path='/' , samesite='None')

    return res
  except:
    return Response({'logout_success':False})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def authentication_chk(req):
 return Response({"authenticated":True})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_users(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_self_posts(req):
    user = req.user
    post = Post.objects.filter(user=user)
    serializers = PostSerializer(post, many=True)
    return Response(serializers.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_posts(req):
    post = Post.objects.all()
    serializers = PostSerializer(post, many=True)
    return Response(serializers.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(req):
    serializer = PostSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save(user=req.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_post(req, post_id):
    post = get_object_or_404(Post, post_id=post_id, user=req.user)
    post.delete()
    return Response({'message': 'Post deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_post(req, post_id):
    post = get_object_or_404(Post, post_id=post_id)
    like, created = Like.objects.get_or_create(user=req.user, content_type=ContentType.objects.get_for_model(Post), object_id=post_id)
    if not created:
        like.delete()
        return Response({'message': 'Like removed'}, status=status.HTTP_200_OK)
    return Response({'message': 'Post liked'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(req, post_id):
    post = get_object_or_404(Post, post_id=post_id)
    serializer = CommentSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save(user=req.user, content_type=ContentType.objects.get_for_model(Post), object_id=post_id)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(req, comment_id):
    comment = get_object_or_404(Comment, id=comment_id, user=req.user)
    comment.delete()
    return Response({'message': 'Comment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(req, user_id):
    user_to_follow = get_object_or_404(CustomUser, id=user_id)
    if req.user == user_to_follow:
        return Response({'message': "You can't follow yourself"}, status=status.HTTP_400_BAD_REQUEST)
    follow, created = Followers.objects.get_or_create(follower=req.user, following=user_to_follow)
    if not created:
        follow.delete()
        return Response({'message': 'Unfollowed'}, status=status.HTTP_200_OK)
    return Response({'message': 'Followed'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notifications(req):
    notifications = Notification.objects.filter(user=req.user)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message(req, recipient_id):
    recipient = get_object_or_404(CustomUser, id=recipient_id)
    serializer = MessageSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save(sender=req.user, recipient=recipient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages(req):
    messages = Message.objects.filter(recipient=req.user)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)
