from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Account(models.Model):
    STUDENT = 'Student'
    INSTRUCTOR = 'Instructor'
    SECRETARY = 'Secretary'
    ADMIN = 'Admin'
    ROLE = (
        (STUDENT, 'Student'),
        (INSTRUCTOR, 'Instructor'),
        (SECRETARY, 'Secretary'),
        (ADMIN, 'Admin')
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='account')
    role = models.CharField(max_length=50, choices=ROLE, default=STUDENT)
    hours_left = models.PositiveSmallIntegerField(default=0)
    hours_done = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name

class Appointment(models.Model):
    student = models.OneToOneField(Account, on_delete=models.CASCADE, default=None, related_name='student')
    hour = models.DateTimeField()
    lieux = models.CharField(max_length=50)
    date = models.DateField()
    instructor = models.OneToOneField(Account, on_delete=models.CASCADE, default=None, related_name='instructor')
