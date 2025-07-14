from rest_framework import generics
from .models import Ingresos
from .serializars import IngresosSerializer

class IngresoListCreteView(generics.ListCreateAPIView):
    queryset = Ingresos.objects.all()
    serializer_class = IngresosSerializer

# Create your views here.
