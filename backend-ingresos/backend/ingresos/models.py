from django.db import models

class Ingresos(models.Model):
    fecha = models.DateField()
    descripcion = models.CharField(max_length=255)
    monto = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f" {self.fecha} - {self.descripcion} - $ {self.monto}"

# Create your models here.
