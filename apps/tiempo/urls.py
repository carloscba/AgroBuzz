from django.conf.urls import include, url
from views import view, data

urlpatterns = [
    url(r'^view/', view, name='tiempoView'),
    url(r'^data/', data, name='tiempoData'),
]