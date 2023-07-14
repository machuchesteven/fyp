from django.contrib import admin
from .models import Motorcycle, Violation, Report

# Register your models here.
admin.site.register(Motorcycle)
admin.site.register(Violation)
admin.site.register(Report)