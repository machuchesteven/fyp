from django.db import models
from django.contrib.auth.models import User
from reporting.models import Report, Violation
# Create your models here.
class Penalty(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE)
    violation = models.ForeignKey(Violation, on_delete=models.CASCADE)
    approved_time = models.DateTimeField(auto_now=True, null=True)
    confirmed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    def __str__(self):
        return self.report.motorcycle.plate_number + ' fined for ' + self.violation.name
    
