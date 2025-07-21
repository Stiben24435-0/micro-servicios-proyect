from django.urls import path
from .views import proxy_inventario,proxy_ingresos

#  rutas de la API
# Estas rutas se encargan de redirigir las solicitudes a los microservicios correspondientes.
urlpatterns =[
    path('inventario/', proxy_inventario, name='proxy_inventario'),
    path('inventario/<int:pk>/', proxy_inventario, name='proxy_inventario_detail'),
    path('ingresos/', proxy_ingresos, name='proxy_ingresos'),
    path('ingresos/<int:pk>/', proxy_ingresos, name='proxy_ingresos_detail'),
]