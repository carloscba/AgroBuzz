from django.conf.urls import include, url
from views import *

from .views import viewMap, xmlDatosEstaciones

urlpatterns = [
    url(r'^$', viewMap),
    url(r'^xmlDatosEstaciones/', xmlDatosEstaciones),
]