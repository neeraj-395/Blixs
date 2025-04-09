from rest_framework.permissions import IsAuthenticated
from notification.models import Notification
from notification.serializers import NotificationSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notifications(req):
    notifications = Notification.objects.filter(user=req.user)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)