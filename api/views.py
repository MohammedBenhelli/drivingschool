from rest_framework.decorators import api_view, parser_classes, authentication_classes, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from api.models import Appointment, Account
from api.serializers import AccountSerializer, AppointmentSerializer, UserSerializer

# Create your views here.
def get_authenticated_user(request) -> get_user_model():
    headers = request.headers
    auth = headers.get('Authorization')
    if auth is not None:
        if auth.startswith('Token '):
            token = auth[6:]
            return Token.objects.get(key=token).user
        else:
            raise ValueError('Unknown authentication method')
    else:
        raise ValueError('no authentication found')

@api_view(['POST'])
def register(request):
    email = request.data.get('email')
    first_name = request.data.get('first_name').lower().capitalize()
    password = request.data.get('password')
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

@api_view(['POST'])
def login(request):
    print(request.data.get('username'),request.data.get('password'))
    user = authenticate(username=request.data.get('username'), password=request.data.get('password'))
    if user is None:
        return Response('Error', status=status.HTTP_401_UNAUTHORIZED)
    print(user)
    account = Account.objects.get(user=user)
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, "account": AccountSerializer(account).data})

@api_view(['POST'])
@authentication_classes((TokenAuthentication,))
def student_info(request):
    user = get_authenticated_user(request)
    account = Account.objects.get(user=user)
    if account.role == 'Student':
        appointments = Appointment.objects.filter(student=account)
        return Response({"student": AccountSerializer(account).data, "appointments": AppointmentSerializer(appointments, many=True).data}, status=status.HTTP_200_OK)
    else:
        return Response('Error', status=status.HTTP_401_UNAUTHORIZED)
