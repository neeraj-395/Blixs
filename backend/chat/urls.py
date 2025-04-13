from django.urls import path
from chat.views import ChatRoomView, MessagesView

urlpatterns = [
	path('', ChatRoomView.as_view(), name='createChatRoom'),
	path('<str:roomid>/messages', MessagesView.as_view(), name='messageList'),
	path('users/<int:userid>/messages', ChatRoomView.as_view(), name='chatRoomList'),
]