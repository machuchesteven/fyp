from rest_framework import serializers
from django.contrib.auth.models import User    
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')
        write_only_fields = ('password',)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def check_user(self, attrs):
        user = authenticate(username=attrs['username'], 
        password=attrs['password'])
        if not user:
            raise serializers.ValidationError('Incorrect username or password.')
        if not user.is_active:
            raise serializers.ValidationError('User is disabled.')
        print("User from serializer")
        return user


