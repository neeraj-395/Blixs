from rest_framework import status
from user.models import CustomUser, Followers
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from user.serializers import UserRegisterSerializer, UserSerializer
from rest_framework.decorators import api_view, permission_classes

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        _ = serializer.save()
        return Response(
            {"message": "User registered successfully!"},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def logout(req):
  try:
    response = Response()
    response.data = {'logout_success':True}
    response.delete_cookie('access_token' , path='/') 
    response.delete_cookie('refresh_token' , path='/')
    return response
  except:
    return Response({'logout_success':False})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request):
    if request.method == "DELETE":
        user = request.user
        user.delete()
        return Response({"Response": "User deleted successfully"}, status=204)
    return Response({"error": "Invalid request method/Not Logged In"}, status=400)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_user(request):
    user = request.user
    serializer = UserRegisterSerializer(user, data=request.data , partial=True)
    if serializer.is_valid():
        serializer.save()  
        return Response(
            {"Response": "Profile Edited successfully!", 'data': serializer.data}, 
            status=status.HTTP_200_OK
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
   return Response({'success': True})
  
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
    user_to_follow = get_object_or_404(CustomUser, user_id=user_id)
    if req.user == user_to_follow:
        return Response(
            {'message': "You can't follow yourself"}, 
            status=status.HTTP_400_BAD_REQUEST)
    follow, created = Followers.objects.get_or_create(follower=req.user, following=user_to_follow)
    if not created:
        follow.delete()
        return Response({'message': 'Unfollowed'}, status=status.HTTP_200_OK)
    return Response({'message': 'Followed'}, status=status.HTTP_201_CREATED)
