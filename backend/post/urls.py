from django.urls import path
from post.views import *

urlpatterns = [
    path('all/', get_posts, name='get-posts'),
    path('user/all/', get_user_posts, name='get-user-posts'),
    path('create/', create_post, name='create-post'),
    path('<int:post_id>/delete/', delete_post, name='delete-post'),
    path('<int:post_id>/like/', like_post, name='like-post'),
    path('<int:post_id>/comment/', add_comment, name='add-comment'),
    path('comments/<int:comment_id>/delete/', delete_comment, name='delete-comment')
]