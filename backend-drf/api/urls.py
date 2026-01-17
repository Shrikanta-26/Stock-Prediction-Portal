from django.urls import path
from accounts import views as UserViews

urlpatterns = [
    path('register/',UserViews.RegisteredView.as_view(),name='register_view')
]
