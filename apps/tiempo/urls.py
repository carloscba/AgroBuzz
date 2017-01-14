from django.conf.urls import include, url
from views import *

urlpatterns = [
    url(r'^view/', view, name='tiempoView'),
    
    url(r'^data/', data),
    url(r'^resumen/', resumen),
    url(r'^pordia/', pordia),
]