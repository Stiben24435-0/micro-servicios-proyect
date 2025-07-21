
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),  #Ahora api/core.urls maneja las rutas de la API esta fusionadas ingresos e inventario
]
