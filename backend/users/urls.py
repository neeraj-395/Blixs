from django.urls import path
from users.token import *
from users.views import register, logout, get_user, get_users

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('register/', register, name='register'),
    path('logout/', logout, name='logout'),
    path('users/', get_users, name='get-users'),
    path('user/', get_user, name='get-user')
]