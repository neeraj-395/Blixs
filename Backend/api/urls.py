from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView)
from django.urls import path , include
# from base.views import *
urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('token/', CoustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', CoustomRefreshTokenView.as_view(), name='token_refresh'),
    # path('notes/', get_notes),
    # path('logout/', logout),
    # path('authenticated/', authentication_chk),
    # path('register/', register),
]