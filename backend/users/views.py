from rest_framework import status
from users.models import CustomUser, Followers
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from users.serializers import UserRegisterSerializer, UserSerializer
from rest_framework.decorators import api_view, permission_classes

@csrf_exempt
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
  
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
  
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_users(request):
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

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
