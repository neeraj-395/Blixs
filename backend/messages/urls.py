from django.urls import path
from messages.views import send_message, get_messages

urlpatterns = [
    path('messages/send/<int:recipient_id>/', send_message, name='send-message'),
    path('messages/', get_messages, name='get-messages'),
]