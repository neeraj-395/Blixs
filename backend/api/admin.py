from django.contrib import admin
from django.apps import apps

# Get all models from your 'api' app
models = apps.get_app_config('api').get_models()

for model in models:
    admin.site.register(model)