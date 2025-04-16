from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from user.models import CustomUser, Follow
from user.serializers import UserRegisterSerializer, UserSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Register a new user"""
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'success': True,
            'userid': user.id,
            'username': user.username
        }, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    """Logout the user by deleting tokens"""
    response = Response({'success': True, 'message': 'logged out'}, status=status.HTTP_200_OK)
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    return response


@api_view(['GET'])
@permission_classes([AllowAny])
def check_authentication(request):
    """Check if the user is authenticated"""
    if request.user.is_authenticated:
        return Response({'success': True, 'message': 'user is authenticated'}, status=status.HTTP_200_OK)
    return Response({'success': False, 'message': 'user not authenticated'}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user_account(request):
    """Delete the logged-in user's account"""
    user = request.user
    user.delete()
    return Response({'success': True, 'message': 'user deleted'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_user(request):
    """Update the user's profile partially"""
    user = request.user
    serializer = UserRegisterSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'message': "Profile updated successfully",
            'data': serializer.data
        }, status=status.HTTP_200_OK)
    return Response({'success': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    """Get the current logged-in user's profile"""
    serializer = UserSerializer(request.user)
    return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_users(request):
    """List all registered users"""
    users = CustomUser.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response({'success': True, 'users': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_follow_toggle(request, user_id):
    """Follow or unfollow a user"""
    user_to_follow = get_object_or_404(CustomUser, id=user_id)

    if request.user == user_to_follow:
        return Response(
            {'success': False, 'message': "you can't follow yourself"},
            status=status.HTTP_400_BAD_REQUEST
        )

    follow, created = Follow.objects.get_or_create(follower=request.user, following=user_to_follow)
    if not created:
        follow.delete()
        return Response({'success': True, 'message': 'unfollowed'}, status=status.HTTP_200_OK)
    return Response({'success': True, 'message': 'followed'}, status=status.HTTP_201_CREATED)
