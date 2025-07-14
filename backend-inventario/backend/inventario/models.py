from django.db import models

class Productos(models.Model):
    nombre = models.CharField(max_length=100)
    cantidad = models.PositiveIntegerField()
    precio = models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return f"{self.nombre} ({self.cantidad} uniddes) $ {self.precio}"

# Create your models here.
