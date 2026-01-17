from rest_framework import serializers
from accounts.models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ( "username","email", "password")
        extra_kwargs = {
            "email": {"error_messages": {"unique": "Email already exists"}},
            "username": {"error_messages": {"unique": "Username already exists"}},
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
