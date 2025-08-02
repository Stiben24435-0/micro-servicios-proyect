from rest_framework import generics,filters
from .models import Ingresos
from .serializars import IngresosSerializer
from rest_framework.permissions import AllowAny

class IngresoListCreteView(generics.ListCreateAPIView):
    queryset = Ingresos.objects.all().order_by("-fecha")
    serializer_class = IngresosSerializer
    permission_classes = [AllowAny] 
    filter_backends = [filters.SearchFilter]
    search_fields = ['fecha','monto']  # campos donde buscar
    
class IngresosDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Ingresos.objects.all()
    serializer_class = IngresosSerializer
    permission_classes = [AllowAny]

# Create your views here.
