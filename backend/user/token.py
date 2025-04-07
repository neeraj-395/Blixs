from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


def set_auth_cookies(response, access_token, refresh_token=None):
    """
    Helper function to set authentication cookies.
    """
    cookie_settings = {
        'httponly': True,
        'secure': True,
        'samesite': 'None',
        'path': '/',
    }

    response.set_cookie(key="access_token", value=access_token, **cookie_settings)

    if refresh_token:
        response.set_cookie(key="refresh_token", value=refresh_token, **cookie_settings)

    return response


def error_response(message, code=status.HTTP_400_BAD_REQUEST, **kwargs):
    return Response({'success': False, 'error': message, **kwargs}, status=code)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom view for login: issues JWT tokens and sets them in cookies.
    """
    def post(self, request, *args, **kwargs):
        try:
            token_response = super().post(request, *args, **kwargs)
            token_data = token_response.data

            access_token = token_data.get('access') #type: ignore
            refresh_token = token_data.get('refresh') #type: ignore

            if not access_token or not refresh_token:
                return error_response("Tokens not generated properly")

            response = Response({'success': True}, status=status.HTTP_200_OK)
            return set_auth_cookies(response, access_token, refresh_token)

        except Exception as e:
            logger.exception("Token obtain failed")
            return error_response(str(e), code=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CustomRefreshTokenView(TokenRefreshView):
    """
    Custom view for refreshing the access token using a refresh token from cookies.
    """
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')
            if not refresh_token:
                return error_response("No refresh token found in cookies")

            # Inject refresh token into request data
            request.data['refresh'] = refresh_token #type: ignore

            token_response = super().post(request, *args, **kwargs)
            new_access_token = token_response.data.get('access') #type: ignore

            if not new_access_token:
                return error_response("No access token returned after refresh")

            response = Response({'refreshed': True}, status=status.HTTP_200_OK)
            return set_auth_cookies(response, new_access_token)

        except Exception as e:
            logger.exception("Token refresh failed")
            return error_response(str(e), code=status.HTTP_500_INTERNAL_SERVER_ERROR)
