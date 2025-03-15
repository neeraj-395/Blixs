from django.urls import path
from api.views import *
# from base.views import *

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
    path('register/', register, name='register'),
    path('logout/', logout, name='logout'),
    path('authenticate/', authentication_chk, name='authenticate'),
    path('users/', get_all_users, name='get-all-users'),
    path('posts/self/', get_self_posts, name='get-self-posts'),
    path('posts/', get_all_posts, name='get-all-posts'),
    path('posts/create/', create_post, name='create-post'),
    path('posts/<int:post_id>/delete/', delete_post, name='delete-post'),
    path('posts/<int:post_id>/like/', like_post, name='like-post'),
    path('posts/<int:post_id>/comment/', add_comment, name='add-comment'),
    path('comments/<int:comment_id>/delete/', delete_comment, name='delete-comment'),
    path('follow/<int:user_id>/', follow_user, name='follow-user'),
    path('notifications/', get_notifications, name='get-notifications'),
    path('messages/send/<int:recipient_id>/', send_message, name='send-message'),
    path('messages/', get_messages, name='get-messages'),
]