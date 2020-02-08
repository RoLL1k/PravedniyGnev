from django.contrib.auth import logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy, reverse
from django.views.generic import CreateView, UpdateView

from django.contrib import messages
from .forms import RegisterUserForm, ReviewForm, AIFormSet, RebuttalForm, AIRebFormSet, LoginForm, ChangeUserInfoForm, \
    ProfPasswordChangeForm, UserPasswordResetForm, UserSetPasswordForm, ComSugForm
from .models import Review, AdvUser, Rebuttal, AdditionalImage
from .utilities import get_timestamp_name
from django.contrib.auth.views import LoginView, PasswordChangeView, PasswordResetView, PasswordResetConfirmView, \
    PasswordResetDoneView, PasswordResetCompleteView
from django.contrib.auth.decorators import login_required
from django.views.generic import View
from base64 import b64decode
from django.core.files.base import ContentFile


kassa_id = '5e3bf2a11ae1bd2a008b4574'


def main(request):
    return render(request, 'main/index.html')


def redirect_to_info(request):
    return render(request, 'main/info_page.html')


# ------------Review----------------


def reviews_list(request):
    revs = Review.objects.all()
    return render(request, 'review/review_list.html', context={"revs": revs})


def review_detail(request, pk):
    rev = get_object_or_404(Review, pk=pk)
    img_set = rev.additionalimage_set.all()
    return render(request, 'review/review_detail.html', context={"rev": rev, "img_set": img_set})


class ReviewCreate(LoginRequiredMixin, View):
    def get(self, request):
        form = ReviewForm(initial={'author': request.user.pk})
        formset = AIFormSet()
        return render(request, "review/add_review.html", context={"form": form, "formset": formset})

    def post(self, request):
        form = ReviewForm(request.POST, request.FILES)
        if form.is_valid():
            review = form.save()
            i = 0
            while i < 20:
                b64_text = request.POST.get('image-{}'.format(i))
                if b64_text == '':
                    break
                else:
                    img_format, imgstr = b64_text.split(';base64,')
                    image_data = b64decode(imgstr)
                    ext = img_format.split('/')[-1]
                    filename = get_timestamp_name(ext)
                    image = AdditionalImage.objects.create(review=review, image=ContentFile(image_data, filename))
                    image.save()
                    request.session['review_id'] = form.save().id
                    i += 1
            return redirect('payment:get_payment_form', pk=review.id)  # на страницу оплаты
        return render(request, "review/add_review.html", context={"form": form})
            # formset = AIFormSet(request.POST, request.FILES, instance=review)
            # if formset.is_valid():
            #     formset.save()
            #     request.session['review_id'] = form.save().id
            #     return redirect('payment:get_payment_form', pk=review.id)  # на страницу оплаты
        # return render(request, "review/add_review.html", context={"form": form, "formset": formset})


class ReviewUpdate(LoginRequiredMixin, View):
    def get(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        form = ReviewForm(instance=review)
        formset = AIFormSet(instance=review)
        return render(request, 'review/update_review.html', context={"form": form, "formset": formset, "rev_pk": pk})

    def post(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        form = ReviewForm(request.POST, request.FILES, instance=review)

        if form.is_valid():
            review = form.save()
            formset = AIFormSet(request.POST, request.FILES, instance=review)
            if formset.is_valid():
                formset.save()

                messages.add_message(request, messages.SUCCESS, 'Отзыв исправлен')
                return redirect('ReviewApp:get_reviews_list')
        return render(request, 'review/update_review.html', context={"form": form, "formset": formset, "rev_pk": pk})


class ReviewDelete(LoginRequiredMixin, View):
    template = "review/delete_review.html"
    redirect_url = 'ReviewApp:get_reviews_list'

    def get(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        return render(request, self.template, context={"rev": review})

    def post(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        request.session['review_id'] = review.id
        return redirect(reverse('payment:process_del'))  # на страницу оплаты


# ------------Rebuttal----------------


def rebuttals_list(request, pk):
    rev = get_object_or_404(Review, pk=pk)
    rebs = rev.rebuttal_set.all()
    return render(request, 'rebuttal/rebuttal_list.html', context={"rebs": rebs, "rev_pk": pk})


def rebuttal_detail(request, rev_pk, reb_pk):
    rev = get_object_or_404(Review, pk=rev_pk)
    reb = rev.rebuttal_set.get(pk=reb_pk)
    img_set = reb.additionalimagereb_set.all()
    return render(request, 'rebuttal/rebuttal_detail.html', context={"rev_pk": rev_pk, "reb": reb, "img_set": img_set})


class RebuttalCreate(LoginRequiredMixin, View):
    def get(self, request, pk):
        review = get_object_or_404(Review, pk=pk)
        form = RebuttalForm(initial={'author': request.user.pk, 'review': pk, 'price': review.price})
        formset = AIRebFormSet()
        return render(request, "rebuttal/add_rebuttal.html", context={"form": form, "formset": formset})

    # -//////------Добавить оплату----------//////-

    def post(self, request, pk):
        form = RebuttalForm(request.POST, request.FILES)
        if form.is_valid():
            rebuttal = form.save()
            formset = AIRebFormSet(request.POST, request.FILES, instance=rebuttal)
            if formset.is_valid():
                formset.save()
                request.session['rebuttal_id'] = form.save().id
                request.session['review_id'] = pk
                return redirect(reverse('payment:process_reb'))  # на страницу оплаты
        return render(request, "rebuttal/add_rebuttal.html", context={"form": form, "formset": formset})


class RebuttalUpdate(LoginRequiredMixin, View):
    def get(self, request, rev_pk, reb_pk):
        reb = get_object_or_404(Rebuttal, pk=reb_pk)
        form = RebuttalForm(instance=reb)
        formset = AIRebFormSet(instance=reb)
        return render(request, 'rebuttal/update_rebuttal.html', context={"form": form, "formset": formset, "rev_pk": rev_pk, "reb_pk": reb_pk})

    def post(self, request, rev_pk, reb_pk):
        reb = get_object_or_404(Rebuttal, pk=reb_pk)
        form = RebuttalForm(request.POST, request.FILES, instance=reb)
        if form.is_valid():
            reb = form.save()
            formset = AIRebFormSet(request.POST, request.FILES, instance=reb)
            if formset.is_valid():
                formset.save()
                messages.add_message(request, messages.SUCCESS, 'Опровержение исправлено')
                return redirect('ReviewApp:get_rebuttal_detail', rev_pk=rev_pk, reb_pk=reb_pk)
        return render(request, 'rebuttal/update_rebuttal.html', context={"form": form, "formset": formset, "rev_pk": rev_pk, "reb_pk": reb_pk})


class RebuttalDelete(LoginRequiredMixin, View):
    template = 'rebuttal/delete_rebuttal.html'
    redirect_url = 'ReviewApp:get_rebuttals_list'
    redirect_pk = None

    def get(self, request, rev_pk, reb_pk):
        rev = get_object_or_404(Review, pk=rev_pk)
        reb = rev.rebuttal_set.get(pk=reb_pk)
        return render(request, self.template, context={"reb": reb, "rev_pk": rev_pk})

    # сначала оплата потом перенаправление на удаление

    def post(self, request, rev_pk, reb_pk):
        self.redirect_pk = rev_pk
        rev = get_object_or_404(Review, pk=rev_pk)
        reb = rev.rebuttal_set.get(pk=reb_pk)
        reb.is_active = False
        reb.save()
        messages.add_message(request, messages.SUCCESS, 'Опровержение удалено')
        return redirect(self.redirect_url, pk=self.redirect_pk)


# ------------Authorization-------------


class LoginUser(LoginView):
    template_name = 'authorization/login.html'
    form_class = LoginForm
    success_url = reverse_lazy('ReviewApp:profile')



@login_required
def profile(request):
    return render(request, 'authorization/profile.html')


def logout_request(request):
    logout(request)
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


class RegisterUserView(CreateView):
    model = AdvUser
    template_name = 'authorization/registration.html'
    form_class = RegisterUserForm
    success_url = reverse_lazy('ReviewApp:profile')


# ------------Profile-------------


@login_required
def profile_reviews(request):
    revs = Review.objects.filter(author=request.user.pk)
    return render(request, 'authorization/prof_reviews.html', context={"revs": revs})


@login_required
def profile_rebuttals(request):
    rebs = Rebuttal.objects.filter(author=request.user.pk)
    return render(request, 'authorization/prof_rebuttals.html', context={"rebs": rebs})


@login_required
def profile_rebuttals_on_me(request):
    rebs = Rebuttal.objects.exclude(author=request.user.pk).filter(review__in=request.user.review_set.all())
    return render(request, 'authorization/prof_rebuttals_on_me.html', context={"rebs": rebs})


@login_required
def review_profile_rebuttals_on_me(request, pk):
    rebs = Rebuttal.objects.exclude(author=request.user.pk).filter(review__in=request.user.review_set.all(), review=pk)
    return render(request, 'authorization/rev_prof_rebuttals_on_me.html', context={"rebs": rebs})


@login_required
def prof_review_detail(request, pk):
    rev = get_object_or_404(Review, pk=pk)
    img_set = rev.additionalimage_set.all()
    return render(request, 'authorization/prof_review_detail.html', context={"rev": rev, "img_set": img_set})


class ProfReviewDelete(ReviewDelete):
    template = 'authorization/prof_review_delete.html'
    redirect_url = 'ReviewApp:profile_reviews'


class ProfRebuttalDelete(RebuttalDelete):
    template = 'authorization/prof_rebuttal_delete.html'
    redirect_url = 'ReviewApp:profile_rebuttals'

    def post(self, request, rev_pk, reb_pk):
        self.redirect_pk = rev_pk
        rev = get_object_or_404(Review, pk=rev_pk)
        reb = rev.rebuttal_set.get(pk=reb_pk)
        reb.is_active = False
        reb.save()
        messages.add_message(request, messages.SUCCESS, 'Опровержение удалено')
        return redirect(self.redirect_url)


@login_required
def prof_rebuttal_detail(request, rev_pk, reb_pk):
    reb = get_object_or_404(Rebuttal, pk=reb_pk)
    img_set = reb.additionalimagereb_set.all()
    return render(request, 'authorization/prof_rebuttal_detail.html', context={"rev_pk": rev_pk, "reb": reb, "img_set": img_set})


class ChangeUserInfoView(SuccessMessageMixin, LoginRequiredMixin, UpdateView):
    model = AdvUser
    template_name = 'authorization/change_user_info.html'
    form_class = ChangeUserInfoForm
    success_url = reverse_lazy('ReviewApp:profile')
    success_message = 'Личные данные пользователя изменены'

    def dispatch(self, request, *args, **kwargs):
        self.user_id = request.user.pk
        return super().dispatch(request, *args, **kwargs)

    def get_object(self, queryset=None):
        if not queryset:
            queryset = self.get_queryset()
        return get_object_or_404(queryset, pk=self.user_id)


class UserPasswordChangeView(SuccessMessageMixin, LoginRequiredMixin, PasswordChangeView):
    template_name = 'authorization/change_user_password.html'
    success_url = reverse_lazy('ReviewApp:profile')
    success_message = 'Пароль пользователя изменен'
    form_class = ProfPasswordChangeForm


class UserPasswordResetView(PasswordResetView):
    template_name = 'authorization/password_reset.html'
    subject_template_name = 'authorization/email/reset_letter_subject.txt'
    email_template_name = 'authorization/email/reset_letter_body.txt'
    success_url = reverse_lazy('ReviewApp:profile')
    form_class = UserPasswordResetForm


class UserPasswordResetDoneView(PasswordResetDoneView):
    template_name = 'authorization/password_reset_done.html'


class UserPasswordResetConfirmView(PasswordResetConfirmView):
    template_name = 'authorization/password_confirm.html'
    success_url = reverse_lazy('ReviewApp:password_reset_complete')
    form_class = UserSetPasswordForm


class UserPasswordResetCompleteView(PasswordResetCompleteView):
    template_name = 'authorization/password_complete.html'


# ------------ComplaintsAndSuggestions-------------


class ComSugCreate(LoginRequiredMixin, View):
    def get(self, request):
        form = ComSugForm(initial={'user_id': request.user.pk})
        return render(request, "authorization/add_complaint.html", context={"form": form})

    def post(self, request):
        form = ComSugForm(request.POST)
        if form.is_valid():
            form.save()
            messages.add_message(request, messages.SUCCESS, 'Сообщение разработчикам отправлено')
            return redirect('ReviewApp:profile')
        return render(request, "authorization/add_complaint.html", context={"form": form})
