from django.conf.urls import include, url
from views import view

urlpatterns = [
    url(r'^view/', view, name='empresaList'),
]