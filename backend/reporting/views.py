from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializers import ReportSerializer, MotorcycleSerializer, ViolationSerializer
from .models import Motorcycle, Violation, Report

class ViolationViewSet(ModelViewSet):
    queryset = Violation.objects.all()
    serializer_class = ViolationSerializer

class MotorcycleViewSet(ModelViewSet):
    queryset = Motorcycle.objects.all()
    serializer_class = MotorcycleSerializer

class ReportViewSet(ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
