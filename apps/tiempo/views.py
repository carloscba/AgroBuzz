from django.shortcuts import render
from models import Tiempo
import numpy as np
from django.http import HttpResponse
from django.core import serializers
import json

# Create your views here.
def view(request):
    context = {
    }
    return render(request, 'tiempo/view.html', context)

def resumen(request):
    temperaturasData = Tiempo.objects.values_list("temperatura", flat=True)
    temperaturas = np.array(list(temperaturasData)) 

    dataJson = {
        "media" : np.mean(temperaturas),
        "maxima" : np.max(temperaturas),
        "minima" : np.min(temperaturas)
    }

    return HttpResponse(json.dumps(dataJson), content_type="application/json")   

def data(request):

    records = Tiempo.objects.filter(temperatura__range = (16, 27))
    results = [record.as_json() for record in records]
    dataJson = json.dumps(results)

    return HttpResponse(dataJson, content_type="application/json")

def pordia(request):

    diasData = Tiempo.objects.values_list("fecha", flat=True).filter(temperatura__range = (16, 27))
    arrayDias = np.array(list(diasData))

    dias  = np.array(arrayDias).astype('datetime64[D]')

    datetimeToDate = []

    for dia in dias:
        datetimeToDate.append(str(dia))

    count = np.unique(datetimeToDate, return_counts=True)

    returnJson = {
        "day" : list(count[0].astype('str')),
        "count" : list(count[1].astype('str')),
    }

    return HttpResponse(json.dumps(returnJson), content_type="application/json")
    
