from django.shortcuts import render
import numpy as np
from django.http import HttpResponse
from django.core import serializers
import json
from lxml import etree

# Create your views here.
def viewMap(request):
    context = {
    }
    return render(request, 'mapa/mapa.html', context)

def xmlDatosEstaciones(request):
    
    doc = etree.parse('http://clima.bccba.com.ar/xmlDatosEstaciones.php')
    root = doc.getroot()

    estaciones = []

    for estacion in root[0]:
        
        try:
            temp = float(estacion.find('temperatura').text)
        except ValueError:
            temp = 0

        temperatura = int(temp) if temp > 10 else '0'+str(temp)

        estaciones.append({
            "numero" : estacion.find('numero').text,
            "title" : estacion.find('nombre').text,
            "lat" : estacion.find('latitud').text,
            "lng" : estacion.find('longitud').text,
            "temperatura" : estacion.find('temperatura').text,
            "image" : 'static/img/numeros/100'+str(temperatura)+'.png',
            "humedad" : estacion.find('humedad').text,
            "temperaturaMinima" : estacion.find('temperaturaMinima').text,
            "temperaturaMaxima" : estacion.find('temperaturaMaxima').text
        })

    return HttpResponse(json.dumps(estaciones), content_type="application/json")