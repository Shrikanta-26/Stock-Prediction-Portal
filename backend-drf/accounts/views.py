from django.shortcuts import render
from accounts.serializers import UserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from accounts.models import User
# Create your views here.

class RegisteredView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]