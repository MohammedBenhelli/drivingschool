from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Account, Appointment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'username', 'email', 'first_name', 'last_name'


class AccountSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = Account
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    student = AccountSerializer()
    instructor = AccountSerializer()
    class Meta:
        model = Appointment
        fields = '__all__'
