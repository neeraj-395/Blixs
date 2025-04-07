from django.urls import path
from chat.views import ChatRoomView, MessagesView

urlpatterns = [
	path('', ChatRoomView.as_view(), name='chatRoom'),
	path('<str:roomid>/messages', MessagesView.as_view(), name='messageList'),
	path('users/<int:userId>', ChatRoomView.as_view(), name='chatRoomList'),
]