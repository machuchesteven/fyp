from rest_framework.serializers import ModelSerializer
from .models import Penalty

class PenaltySerializer(ModelSerializer):
    class Meta:
        model = Penalty
        fields ="__all__"
