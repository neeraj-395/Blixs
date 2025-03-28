from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('posts/', include('users.urls')),
    # path('stories/', include('stories.urls')),
    path('messages/', include('messages.urls')),
    path('notifications/', include('notifications.urls')),
]