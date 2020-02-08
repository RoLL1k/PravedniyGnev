from django.urls import path
from .views import *


app_name = 'payment'

urlpatterns = [
    path('payment/<int:pk>/', get_payment_form, name="get_payment_form"),
    path('result/', result, name='result'),
    path('success/', success, name='success'),
    path('fail/', fail, name='fail'),
    path('process/review/', payment_process, name='process'),
    path('process/review/delete/', payment_process_delete, name='process_del'),
    path('process/rebuttal/', payment_process_rebuttal, name='process_reb'),
    path('review_done/', payment_review_done, name='review_done'),
    path('rebuttal_done/', payment_rebuttal_done, name='rebuttal_done'),
    path('delete_done/', payment_delete_done, name='delete_done'),
    path('canceled/', payment_canceled, name='canceled'),
]
