from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from messages.serializers import MessageSerializer
from rest_framework.response import Response
from users.models import CustomUser
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from messages.models import Message

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