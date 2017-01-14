from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Tiempo(models.Model):

    estacion = models.IntegerField()
    fecha = models.DateTimeField()
    temperatura = models.FloatField()
    humedad = models.FloatField()
    rocio = models.FloatField()
    precipitacion = models.FloatField()
    

    def __unicode__(self):
        return '{}'.format(self.fecha)
