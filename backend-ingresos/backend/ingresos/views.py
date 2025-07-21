from rest_framework import generics
from .models import Ingresos
from .serializars import IngresosSerializer
from rest_framework.permissions import AllowAny

class IngresoListCreteView(generics.ListCreateAPIView):
    queryset = Ingresos.objects.all()
    serializer_class = IngresosSerializer
    permission_classes = [AllowAny] 
    
class IngresosDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Ingresos.objects.all()
    serializer_class = IngresosSerializer
    permission_classes = [AllowAny]

# Create your views here.
