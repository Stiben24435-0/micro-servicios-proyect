from django.urls import path
from .views import IngresoListCreteView,IngresosDetailView

urlpatterns = [
    path('',IngresoListCreteView.as_view(),
         name="ingresos-list-crate"),
     path('<int:pk>/',
         IngresosDetailView.as_view(), name='producto-detail'),  
]
