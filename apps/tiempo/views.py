from django.shortcuts import render
from models import Tiempo
import numpy as np

# Create your views here.
def view(request):

    temperaturasData = Tiempo.objects.values_list("temperatura", flat=True)
    temperaturas = np.array(list(temperaturasData))

    media = np.mean(temperaturas)
    maxima = np.mean(temperaturas)
    minima = np.mean(temperaturas)

    print "media: " + str(media)
    
    context = {
        'temperaturas': temperaturas,
        'test' : np.random.randn
    }
    return render(request, 'tiempo/view.html', context)
