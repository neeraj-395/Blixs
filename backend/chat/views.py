from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from chat.serializers import ChatRoomSerializer, ChatMessageSerializer
from chat.models import ChatRoom, ChatMessage

class ChatRoomView(APIView):
	def get(self, request, userid):
		chatRooms = ChatRoom.objects.filter(members=userid)
		serializer = ChatRoomSerializer(
			chatRooms, many=True, context={"request": request}
		)
		return Response({'success': True, 'data': serializer.data }, status=status.HTTP_200_OK)

	def post(self, request):
		serializer = ChatRoomSerializer(
			data=request.data, context={"request": request}
		)
		if serializer.is_valid():
			serializer.save()
			return Response({'success': True, 'data': serializer.data }, status=status.HTTP_200_OK)
		return Response({'success': False, 'errors': serializer.errors }, status=status.HTTP_400_BAD_REQUEST)

class MessagesView(ListAPIView):
	serializer_class = ChatMessageSerializer

	def get_queryset(self):
		roomid = self.kwargs['roomid']
		return ChatMessage.objects.filter(chat__id=roomid).order_by('-timestamp').all()
	
	def list(self, request, *args, **kwargs):
		queryset = self.get_queryset()
		serializer_context = { 'request': request }

		serializer = self.serializer_class(
			queryset, 
			context=serializer_context, many=True
		)

		return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)