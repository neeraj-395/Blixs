from django.urls import path
from notifications.views import *

urlpatterns = [
    path('notifications/', get_notifications, name='notifications')
]