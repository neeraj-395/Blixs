from rest_framework import status
from post.models import Post, Comment, Like
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from django.contrib.contenttypes.models import ContentType
from post.serializers import PostSerializer, CommentSerializer
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_posts(req):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response({'success': True, 'data': serializer.data})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_posts(req):
    posts = Post.objects.filter(user=req.user)
    serializer = PostSerializer(posts, many=True)
    return Response({'success': True, 'data': serializer.data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(req):
    serializer = PostSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save(user=req.user)
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_post(req, post_id):
    post = get_object_or_404(Post, post_id=post_id, user=req.user)
    post.delete()
    return Response({'success': True, 'message': 'Post deleted successfully.'}, status=status.HTTP_200_OK)  # use 200 instead of 204 to allow response body

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def like_post_toggle(req, postid):
    _ = get_object_or_404(Post, post_id=postid)
    content_type = ContentType.objects.get_for_model(Post)
    like, created = Like.objects.get_or_create(user=req.user, content_type=content_type, object_id=postid)
    
    if not created:
        like.delete()
        return Response({'success': True, 'message': 'Post unliked.'}, status=status.HTTP_200_OK)
    
    return Response({'success': True, 'message': 'Post liked.'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(req, post_id):
    post = get_object_or_404(Post, post_id=post_id)
    serializer = CommentSerializer(data=req.data)
    
    if serializer.is_valid():
        serializer.save(user=req.user, content_type=ContentType.objects.get_for_model(Post), object_id=post_id)
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
    
    return Response({'success': False, 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(req, comment_id):
    comment = get_object_or_404(Comment, id=comment_id, user=req.user)
    comment.delete()
    return Response({'success': True, 'message': 'Comment deleted successfully.'}, status=status.HTTP_200_OK)  # consistent with delete_post
