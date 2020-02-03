from django import forms
from django.contrib.auth import password_validation
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm, PasswordResetForm, SetPasswordForm
from django.core.exceptions import ValidationError
from django.core.validators import MinLengthValidator
from django.forms import inlineformset_factory

from .models import AdvUser, Review, AdditionalImage, Rebuttal, AdditionalImageReb, ComplaintsAndSuggestions
from django.utils.translation import gettext_lazy as _
import datetime


# ------------Authorization-------------


class LoginForm(AuthenticationForm):
    username = forms.CharField(label='', widget=forms.TextInput(attrs={'placeholder': 'Введите логин', 'class': 'form-text--input', 'id': 'field1'},))
    password = forms.CharField(label='', widget=forms.PasswordInput(attrs={'placeholder': 'Введите пароль', 'class': 'form-text--input'}),)


class ChangeUserInfoForm(forms.ModelForm):
    username = forms.CharField(widget=forms.TextInput(attrs={"placeholder": "Введите логин", "class": "form-text--input2"}))
    email = forms.EmailField(required=True, label='Email', widget=forms.EmailInput(attrs={"placeholder": "Введите e-mail", "class": "form-text--input2"}))

    class Meta:
        model = AdvUser
        fields = ('username', 'email', 'send_messages')


class ProfPasswordChangeForm(PasswordChangeForm):
    old_password = forms.CharField(
        label=_("Old password"),
        widget=forms.PasswordInput(
            attrs={"placeholder": "Старый пароль", "class": "form-text--input2", 'autofocus': True}),
    )
    new_password1 = forms.CharField(
        label=_("New password"),
        widget=forms.PasswordInput(attrs={"placeholder": "Новый пароль", "class": "form-text--input2"}),
        help_text=password_validation.password_validators_help_text_html(),
    )
    new_password2 = forms.CharField(
        label=_(""),
        widget=forms.PasswordInput(attrs={"placeholder": "Подтверждение нового пароля", "class": "form-text--input2"}),
    )


class UserPasswordResetForm(PasswordResetForm):
    email = forms.EmailField(
        max_length=254,
        widget=forms.EmailInput(attrs={'placeholder': 'Введите email', 'class': 'form-text--input'})
    )

    def clean(self):
        super().clean()
        data = self.cleaned_data.get('email')
        email_user = AdvUser.objects.filter(email=data)
        if not email_user.exists():
            errors = {'email': ValidationError('Нет пользователей с таким Email')}
            raise ValidationError(errors)


class ComSugForm(forms.ModelForm):
    title = forms.CharField(widget=forms.TextInput(attrs={"placeholder": "Введите название сообщения", "class": "form-text--input2 form-text--input2--position"}))
    body = forms.CharField(required=True, label='Email', widget=forms.Textarea(attrs={"placeholder": "Напишите текст сообщения", "class": "form-text--input3"}))

    class Meta:
        model = ComplaintsAndSuggestions
        fields = '__all__'
        widgets = {'user_id': forms.HiddenInput}


class UserSetPasswordForm(SetPasswordForm):
    new_password1 = forms.CharField(
        label=_("Новый пароль"),
        widget=forms.PasswordInput(attrs={"placeholder": "Введите новый пароль", "class": "form-text--input2"}),
        strip=False,
        help_text=password_validation.password_validators_help_text_html(),
    )
    new_password2 = forms.CharField(
        label=_("Подтвердите пароль"),
        strip=False,
        widget=forms.PasswordInput(attrs={"placeholder": "Подтвердите пароль", "class": "form-text--input2"}),
    )


class RegisterUserForm(forms.ModelForm):
    username = forms.CharField(widget=forms.TextInput(attrs={"placeholder": "Введите логин", "class": "form-text--input2"}), validators=[MinLengthValidator(limit_value=5)],
                               help_text='Минимальная длина логина 5 символов')
    email = forms.EmailField(widget=forms.EmailInput(attrs={"placeholder": "Введите e-mail", "class": "form-text--input2"}))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={"placeholder": "Введите пароль", "class": "form-text--input2"}),
                                help_text=password_validation.password_validators_help_text_html(),
                                )
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={"placeholder": "Подтвердите пароль", "class": "form-text--input2"}),
                                help_text='Введите тот же самый пароль еще раз для проверки',)

    def clean_password1(self):
        password1 = self.cleaned_data['password1']
        if password1:
            password_validation.validate_password(password1)
        return password1

    def clean(self):
        super().clean()
        try:
            password1 = self.cleaned_data['password1']
            password2 = self.cleaned_data['password2']

            if password1 and password2 and password1 != password2:
                errors = {'password2': ValidationError('Введенные пароли не совпадают', code='password_mismatch')}
                raise ValidationError(errors)
        except KeyError:
            errors = {'password1': ValidationError('Придумайте пароль понадёжнее', code='password_mismatch')}
            raise ValidationError(errors)

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        user.is_active = True
        user.is_activated = True
        if commit:
            user.save()
        return user

    class Meta:
        model = AdvUser
        fields = ('username', 'email', 'password1', 'password2', 'send_messages')


# -----------Review--------------


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = '__all__'
        widgets = {'author': forms.HiddenInput,
                   'is_active': forms.HiddenInput,
                   'is_paid': forms.HiddenInput,
                   'braintree_id': forms.HiddenInput,
                   'event_date': forms.DateInput(attrs={'placeholder': 'YYYY-MM-DD'})}


AIFormSet = inlineformset_factory(Review, AdditionalImage, fields='__all__', extra=5)


# -----------Rebuttal--------------


class RebuttalForm(forms.ModelForm):
    class Meta:
        model = Rebuttal
        fields = '__all__'
        widgets = {'author': forms.HiddenInput,
                   'review': forms.HiddenInput,
                   'is_active': forms.HiddenInput,
                   'price': forms.HiddenInput,
                   'braintree_id': forms.HiddenInput,
                   'is_paid': forms.HiddenInput}


AIRebFormSet = inlineformset_factory(Rebuttal, AdditionalImageReb, fields='__all__', extra=5)
