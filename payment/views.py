import braintree
from django.shortcuts import render, redirect, get_object_or_404
from ReviewApp.models import Review, Rebuttal
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError


TEST_KEY = 'j3yifnFaMmXYn2tk'
kassa_id = '5e3bf2a11ae1bd2a008b4574'


def get_payment_form(request, pk):
    review = get_object_or_404(Review, pk=pk)
    context = {'kassa_id': kassa_id, 'rev': review}
    return render(request, 'payment/payment_form.html', context=context)


@csrf_exempt
def result(request):
    try:
        ik_x_id = int(request.POST.get('ik_x_id'))
        review = get_object_or_404(Review, pk=ik_x_id)
        amount = int(request.POST.get('ik_am'))
        if amount == review.price:
            review.is_paid = True
            review.braintree_id = int(request.POST.get('ik_inv_id'))
            review.save()
    except ValueError:
        raise ValidationError('Validation Error')
    return render(request, 'payment/result.html')


@csrf_exempt
def success(request):
    return render(request, 'payment/done.html')


@csrf_exempt
def fail(request):
    return render(request, 'payment/canceled.html')


def payment_process(request):
    review_id = request.session.get('review_id')
    review = get_object_or_404(Review, id=review_id)
    if request.method == 'POST':
        nonce = request.POST.get('payment_method_nonce', None)
        result = braintree.Transaction.sale({
            'amount': '{:.2f}'.format(review.price),
            'payment_method_nonce': nonce,
            'options': {
                'submit_for_settlement': True
            }
        })
        if result.is_success:
            review.is_paid = True
            review.braintree_id = result.transaction.id
            review.save()
            return redirect('payment:review_done')
        else:
            return redirect('payment:canceled')
    else:
        client_token = braintree.ClientToken.generate()
        return render(request, 'payment/process.html', {'review': review, 'client_token': client_token})


def payment_process_rebuttal(request):
    rebuttal_id = request.session.get('rebuttal_id')
    rebuttal = get_object_or_404(Rebuttal, id=rebuttal_id)
    if request.method == 'POST':
        nonce = request.POST.get('payment_method_nonce', None)
        result = braintree.Transaction.sale({
            'amount': '{:.2f}'.format(rebuttal.price),
            'payment_method_nonce': nonce,
            'options': {
                'submit_for_settlement': True
            }
        })
        if result.is_success:
            rebuttal.is_paid = True
            rebuttal.braintree_id = result.transaction.id
            rebuttal.save()
            return redirect('payment:rebuttal_done')
        else:
            return redirect('payment:canceled')
    else:
        client_token = braintree.ClientToken.generate()
        return render(request, 'payment/process.html', {'rebuttal': rebuttal, 'client_token': client_token})


def payment_process_delete(request):
    review_id = request.session.get('review_id')
    review = get_object_or_404(Review, id=review_id)
    if request.method == 'POST':
        nonce = request.POST.get('payment_method_nonce', None)
        result = braintree.Transaction.sale({
            'amount': '{:.2f}'.format(review.price*5),
            'payment_method_nonce': nonce,
            'options': {
                'submit_for_settlement': True
            }
        })
        print(result.is_success)
        if result.is_success:
            rebuttals = review.rebuttal_set.all()
            for rebuttal in rebuttals:
                rebuttal.is_active = False
                rebuttal.is_paid = False
                print(rebuttal.is_active)
                rebuttal.save()
            review.is_active = False
            review.is_paid = False
            review.braintree_id = result.transaction.id
            review.save()
            return redirect('payment:delete_done')
        else:
            return redirect('payment:canceled')
    else:
        client_token = braintree.ClientToken.generate()
        return render(request, 'payment/process.html', {'review': review, 'client_token': client_token})


def payment_review_done(request):
    return render(request, 'payment/review_done.html')


def payment_rebuttal_done(request):
    return render(request, 'payment/rebuttal_done.html')


def payment_delete_done(request):
    return render(request, 'payment/delete_done.html')


def payment_canceled(request):
    return render(request, 'payment/canceled.html')
