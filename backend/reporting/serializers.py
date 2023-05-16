from rest_framework.serializers import HyperlinkedModelSerializer, Serializer, ModelSerializer
from .models import Violation, Report, Motorcycle

class ViolationSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Violation
        fields = "__all__"

class MotorcycleSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Motorcycle
        fields = "__all__"
    
class ReportSerializer(ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"
        read_only_fields = ['id']

