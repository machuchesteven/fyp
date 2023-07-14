from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import (
    ReportSerializer,
    MotorcycleSerializer,
    ViolationSerializer,
    ReportIncidentSerializer,
    DetectedSerializer,
)
from .models import Motorcycle, Violation, Report, Detected
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny


class ViolationViewSet(ModelViewSet):
    queryset = Violation.objects.all()
    serializer_class = ViolationSerializer


class MotorcycleViewSet(ModelViewSet):
    queryset = Motorcycle.objects.all()
    permission_classes = [AllowAny]
    serializer_class = MotorcycleSerializer


class ReportViewSet(ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


class ReportedIncidentsViewSet(ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportIncidentSerializer
    permission_classes = [AllowAny]


class DetectedViewset(ModelViewSet):
    queryset = Detected.objects.all()
    serializer_class = DetectedSerializer
    permission_classes = [AllowAny]
