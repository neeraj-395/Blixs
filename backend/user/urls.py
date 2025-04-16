from django.urls import path
from user.token import *
from user.views import *

urlpatterns = [
    path('auth/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('auth/check/', check_authentication, name='check_authentication'),
    path('auth/register/', register_user, name='register_user'),
    path('auth/logout/', logout_user, name='logout_user'),

    path('delete/', delete_user_account, name='delete_user_account'),
    path('edit/', update_user, name='update_user'),
    path('me/', get_current_user, name='get_current_user'),
    path('', list_users, name='all_users'),

    path('<int:user_id>/follow/toggle/', user_follow_toggle, name='user_follow_toggle')
]