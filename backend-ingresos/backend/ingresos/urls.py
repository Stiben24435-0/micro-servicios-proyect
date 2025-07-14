from django.urls import path
from .views import IngresoListCreteView

urlpatterns = [
    path('',IngresoListCreteView.as_view(),
         name="ingresos-list-crate"),
]