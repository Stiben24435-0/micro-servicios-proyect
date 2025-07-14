from rest_framework import serializers
from .models import Ingresos

class IngresosSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Ingresos
        fields = '__all__'