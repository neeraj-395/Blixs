from rest_framework_simplejwt.authentication import JWTAuthentication

class CookiesJWTAuthentication(JWTAuthentication):
    def authenticate(self,req):
        access_token = req.COOKIES.get('access_token')

        if not access_token :
           return None # No token found in cookies.

        try:
            validate_token = self.get_validated_token(access_token)
            user = self.get_user(validate_token)
        except Exception:
          return None # Token is invalid or user cannot be retrieved.
         
        return(user, validate_token)