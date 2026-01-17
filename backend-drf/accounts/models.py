from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.utils.translation import gettext_lazy as _


class CustomUserManager(UserManager):
    def create_user(self, username,email, password=None, **extra_fields):
        if not email:
            raise ValueError(_("Email must be provided"))
        if not username:
            raise ValueError(_("Username must be provided"))
        
        extra_fields.setdefault("is_active", True)


        email = self.normalize_email(email)
        user = self.model(email=email, username=username,**extra_fields)         
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username,password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True"))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True"))

        return self.create_user(
            email=email,
            username=username,
            password=password,
            **extra_fields
        )

class User(AbstractUser):
    username = models.CharField(max_length=25, unique=True)
    email = models.EmailField(_("email address"), unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


    objects = CustomUserManager()

    def __str__(self):
        return self.email
