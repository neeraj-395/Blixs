from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('post/', include('post.urls')),
    # path('storie/', include('storie.urls')),
    path('chat/', include('chat.urls')),
    path('notification/', include('notification.urls')),
]