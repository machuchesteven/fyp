from rest_framework.serializers import (
    HyperlinkedModelSerializer,
    Serializer,
    ModelSerializer,
)
from .models import Violation, Report, Motorcycle, Detected


class ViolationSerializer(ModelSerializer):
    class Meta:
        model = Violation
        fields = "__all__"


class MotorcycleSerializer(ModelSerializer):
    class Meta:
        model = Motorcycle
        fields = "__all__"


class ReportSerializer(ModelSerializer):
    class Meta:
        model = Report
        fields = "__all__"


class ReportIncidentSerializer(ModelSerializer):
    motorcycle_info = MotorcycleSerializer(read_only=True)
    Violation = ViolationSerializer(read_only=True)

    class Meta:
        model = Report
        fields = "__all__"
        # read_only_fields = ['date_reported']

    def to_representation(self, instance):
        response = super(ReportIncidentSerializer, self).to_representation(instance)
        response["motorcycle_info"] = MotorcycleSerializer(instance.motorcycle).data
        response["violation"] = ViolationSerializer(instance.violation).data
        return response


class DetectedSerializer(ModelSerializer):
    class Meta:
        model = Detected
        fields = "__all__"
