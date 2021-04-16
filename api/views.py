from rest_framework.decorators import api_view, parser_classes, authentication_classes, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.contrib.auth.models import User
from api.models import Appointment, Account
from api.serializers import AccountSerializer, AppointmentSerializer, UserSerializer

# Create your views here.
@api_view(['POST'])
def register(request):
    email = request.data.get('email')
    first_name = request.data.get('first_name').lower().capitalize()
    password = request.data.get('last_name').lower().capitalize()
    last_name = request.data.get('last_name').lower().capitalize()
    serialized = UserSerializer(data={
        "username": email,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": make_password(password)})
    if serialized.is_valid():
        user = serialized.save(email=email)
        user.set_password(password)
        user.save()
        token, created = Token.objects.get_or_create(user=user)
        account = Account.objects.create(
            user=user
        )
        return Response({'token': token.key, 'account': AccountSerializer(account).data}, status=status.HTTP_201_CREATED)
    else :
        return Response(serialized.errors, status=status.HTTP_200_OK)
