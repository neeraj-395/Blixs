from django.urls import path
from notification.views import *

urlpatterns = [
    path('all/', get_notifications, name='notifications')
]