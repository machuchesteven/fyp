from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import ReportSerializer, MotorcycleSerializer, ViolationSerializer, ReportIncidentSerializer
from .models import Motorcycle, Violation, Report
from rest_framework.permissions import IsAuthenticated, IsAdminUser
class ViolationViewSet(ModelViewSet):
    queryset = Violation.objects.all()
    serializer_class = ViolationSerializer

class MotorcycleViewSet(ModelViewSet):
    queryset = Motorcycle.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = MotorcycleSerializer

class ReportViewSet(ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

class ReportedIncidentsViewSet(ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportIncidentSerializer
    permission_classes = [IsAuthenticated]

