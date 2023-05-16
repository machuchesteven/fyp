from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Motorcycle(models.Model):
    plate_number = models.CharField(max_length=10, null=False, blank=False)
    registered_lat = models.CharField(max_length=10, null=True, blank=True)
    registered_long = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return self.plate_number

class Violation(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    penalty_amount = models.IntegerField(null=True, blank=True)
    def __str__(self):
        return self.name


class Report(models.Model):
    date_reported = models.DateTimeField(auto_now=False, auto_now_add=False)
    location_lat = models.CharField(max_length=10, null=True, blank=True)
    location_long = models.CharField(max_length=10, null=True, blank=True)
    desc_of_violation = models.TextField()
    reporter_id = models.ForeignKey(User, blank=True, null=True, on_delete=models.SET_NULL)
    is_anonymous = models.BooleanField(default=False)
    violation = models.ForeignKey(Violation, blank=True, null=True, on_delete=models.CASCADE)
    motorcycle = models.ForeignKey(Motorcycle, on_delete=models.CASCADE)
    def __str__(self):
        return self.motorcycle.plate_number + " reported for " + self.violation.name
    