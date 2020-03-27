from .settings import DATABASES

# make tests faster
DATABASES['default'] = {'ENGINE': 'django.db.backends.sqlite3', 'NAME': 'testdb'}
