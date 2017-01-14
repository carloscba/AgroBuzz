from django.test import TestCase
from models import Tiempo

# Create your tests here.
#python manage.py test apps.tiempo.tests
class TiempoTestCase(TestCase):
    
    def results(self):
        records = Tiempo.objects.filter(temperatura__range = (16, 27))
        results = [record.as_json() for record in records]
        print json.dumps(results)
