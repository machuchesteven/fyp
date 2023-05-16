from .views import UserViewSet, LoginView, reported_view
from rest_framework.routers import DefaultRouter
from django.urls import path, include
router = DefaultRouter()
router.register('', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('quick-report', reported_view, name="reported"),
    path('login', LoginView.as_view(), name='login'),
]
