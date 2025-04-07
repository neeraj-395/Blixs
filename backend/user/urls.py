from django.urls import path
from user.token import *
from user.views import *

urlpatterns = [
    path('auth/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('auth/check/', is_authenticated, name='auth_check'),
    path('auth/register/', register, name='register'),
    path('auth/logout/', logout, name='logout'),

    path('delete/', delete_user, name='delete_current_user'),
    path('edit/', edit_user, name='edit_current_user'),
    path('user/', get_user, name='get_current_user'),

    path('all/', get_users, name='g'),
    path('<int:user_id>/follow', follow_user, name='follow_user')
]