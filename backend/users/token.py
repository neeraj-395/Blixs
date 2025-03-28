from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

def set_auth_cookies(response, access_token, refresh_token=None):
    """
    Helper function to set auth cookies.
    """
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite='None',
        path='/'
    )

    if refresh_token:
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True,
            secure=True,
            samesite='None',
            path='/'
        )
        
    return response

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom view for obtaining a pair of tokens (access & refresh) and setting them in cookies.
    """
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            token = response.data

            access_token = token.get('access')
            refresh_token = token.get('refresh')

            if not access_token or not refresh_token:
                return Response({'error': 'Tokens not generated properly'}, status=status.HTTP_400_BAD_REQUEST)

            res = Response({'success': True})
            res = set_auth_cookies(res, access_token, refresh_token)

            return res

        except Exception as e:
            logger.error(f"Error in CustomTokenObtainPairView: {e}")
            return Response({'success': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CustomRefreshTokenView(TokenRefreshView):
    """
    Custom view for refreshing the access token using the refresh token from cookies.
    """
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            if not refresh_token:
                return Response({'refreshed': False, 'error': 'No refresh token found in cookies'}, status=status.HTTP_400_BAD_REQUEST)

            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens.get('access')

            if not access_token:
                return Response({'refreshed': False, 'error': 'No access token returned after refresh'}, status=status.HTTP_400_BAD_REQUEST)

            res = Response({'refreshed': True})
            res = set_auth_cookies(res, access_token)

            return res

        except Exception as e:
            logger.error(f"Error in CustomRefreshTokenView: {e}")
            return Response({'refreshed': False, 'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
