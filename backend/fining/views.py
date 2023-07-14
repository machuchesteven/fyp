from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from .models import Penalty
from .serializers import PenaltySerializer


class PenaltyViewSet(ModelViewSet):
    queryset = Penalty.objects.all()
    serializer_class = PenaltySerializer
    
class ROPenaltyViewSet(ReadOnlyModelViewSet):
    queryset = Penalty.objects.all()
    serializer_class = PenaltySerializer
    lookup_field_name = 'motorcycle_id'



