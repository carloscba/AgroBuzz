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

def data(request):
    '''
    temperaturasData = Tiempo.objects.values_list("temperatura", flat=True)
    temperaturas = np.array(list(temperaturasData))
    
    jsonData = serializers.serialize("json", Tiempo.objects.all())

    media = np.mean(temperaturas)
    maxima = np.mean(temperaturas)
    minima = np.mean(temperaturas)

    print "media: " + str(media)

    context = {
        'temperaturas': temperaturas,
        'test' : np.random.randn
    }
    '''
    records = Tiempo.objects.filter(temperatura__range = (16, 27))
    results = [record.as_json() for record in records]
    return HttpResponse(json.dumps(results), content_type="application/json")