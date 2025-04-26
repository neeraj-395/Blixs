from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('user.urls')),
    path('posts/', include('post.urls')),
    # path('storie/', include('storie.urls')),
    path('chats/', include('chat.urls')),
    path('notifications/', include('notification.urls')),
]

if settings.DEBUG:
    urlpatterns += static('/media/', document_root=settings.BASE_DIR)