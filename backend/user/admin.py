from django.contrib import admin
from django.apps import apps

models = apps.get_app_config('user').get_models()

for model in models:
    admin.site.register(model)