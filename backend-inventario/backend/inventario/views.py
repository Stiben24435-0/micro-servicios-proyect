from rest_framework import generics
from .models import Productos
from .serializer import ProductoSerializer
from rest_framework.permissions import AllowAny


class ProductoListCreateview(generics.ListCreateAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]



class ProductoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Productos.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [AllowAny]
# Create your views here.
