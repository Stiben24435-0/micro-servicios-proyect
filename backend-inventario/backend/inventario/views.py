from rest_framework import generics
from .models import Productos
from .serializer import ProductoSerializer

class ProductoListCreateview(generics.ListCreateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductoSerializer

# Create your views here.
