from rest_framework_simplejwt.authentication import JWTAuthentication

class CookiesJWTAuthentication(JWTAuthentication):
    def authenticate(self,req):
        acess_token = req.COOKIES.get('access_token')

        if not acess_token :
           return None

        validate_token = self.get_validated_token(acess_token)

        try:
            user = self.get_user(validate_token)
        except:
        #   print('An exception occurred')
          return None
         
        return(user,validate_token)