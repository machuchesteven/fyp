from rest_framework.routers import DefaultRouter
from .views import ReportViewSet, MotorcycleViewSet, ViolationViewSet
from django.urls import path, include
router = DefaultRouter()
router.register(r'report', ReportViewSet)
router.register(r'violation', ViolationViewSet)
router.register(r'motorcycle', MotorcycleViewSet)
urlpatterns = [
    path("/", include(router.urls)),
]
