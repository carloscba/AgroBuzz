from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Estacion(models.Model):

    numero = models.IntegerField(primary_key = True)
    nombre = models.CharField(max_length=64)
    latitud = models.FloatField()
    longitud = models.FloatField()
    altura = models.IntegerField()
    localidad = models.IntegerField()
    provincia = models.IntegerField(default=1)
    instalacion = models.DateField()

    def __unicode__(self):
        return '{}'.format(self.nombre)
