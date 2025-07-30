from rest_framework import generics,filters
from .models import Productos
from .serializer import ProductoSerializer
from rest_framework.permissions import AllowAny


class ProductoListCreateview(generics.ListCreateAPIView):
    queryset = Productos.objects.all().order_by('-id')
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre','cantidad','precio']  # campos donde buscar



class ProductoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]
# Create your views here.
