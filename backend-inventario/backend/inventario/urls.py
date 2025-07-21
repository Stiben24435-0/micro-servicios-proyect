from django.urls import path
from .views import ProductoListCreateview,ProductoDetailView


urlpatterns = [
    # Listar y crear productos (GET y POST)
    path('',
         ProductoListCreateview.as_view(),
         name='producto-list-create'),
    # Ver,actualizar y eliminar un producto 
    path('<int:pk>/',
         ProductoDetailView.as_view(), name='producto-detail'),  
]
