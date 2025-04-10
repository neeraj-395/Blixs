from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('user.urls')),
    path('posts/', include('post.urls')),
    # path('storie/', include('storie.urls')),
    path('chats/', include('chat.urls')),
    path('notifications/', include('notification.urls')),
]