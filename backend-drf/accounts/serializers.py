from rest_framework import serializers
from accounts.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,min_length=8,error_messages={"blank": "Password cannot be blank","min_length": "Password must be at least 8 characters long"})

    class Meta:
        model = User
        fields = ("username", "email", "password")
        extra_kwargs = {
            "username": {"validators": []}, 
            "email": {"validators": []},     
        }

    # Custom username validation
    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    # Custom email validation
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    # Create user
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
