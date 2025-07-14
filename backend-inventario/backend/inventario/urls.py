from django.urls import path
from .views import ProductoListCreateview


urlpatterns = [
    path('',
         ProductoListCreateview.as_view(),
         name= 'producto-list-create'),
]

