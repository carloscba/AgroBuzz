from __future__ import unicode_literals

from django.db import models
from datetime import datetime

# Create your models here.
class Tiempo(models.Model):

    estacion = models.IntegerField()
    fecha = models.DateTimeField()
    temperatura = models.FloatField()
    humedad = models.FloatField()
    rocio = models.FloatField()
    precipitacion = models.FloatField()

    def as_json(self):
        return dict(
            estacion = self.estacion,
            fecha = self.fecha.isoformat(),
            temperatura = self.temperatura,
            humedad = self.humedad,
            rocio = self.rocio,
            precipitacion = self.precipitacion
        )
   