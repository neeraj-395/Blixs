from django.contrib import admin
from django.urls import path , include
from api.urls import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]