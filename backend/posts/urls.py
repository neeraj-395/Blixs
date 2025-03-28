from django.urls import path
from posts.views import *

urlpatterns = [
    path('posts/', get_posts, name='get-posts'),
    path('posts/user/', get_user_posts, name='get-user-posts'),
    path('posts/create/', create_post, name='create-post'),
    path('posts/<int:post_id>/delete/', delete_post, name='delete-post'),
    path('posts/<int:post_id>/like/', like_post, name='like-post'),
    path('posts/<int:post_id>/comment/', add_comment, name='add-comment'),
    path('comments/<int:comment_id>/delete/', delete_comment, name='delete-comment')
]