from django.db import models
from django.contrib.auth.models import AbstractUser

from .utilities import get_timestamp_path


class AdvUser(AbstractUser):
    email = models.EmailField(blank=True, unique=True, max_length=254, verbose_name='Email')
    is_activated = models.BooleanField(default=True, db_index=True, verbose_name="Прошел активацию?")
    send_messages = models.BooleanField(default=True, verbose_name="Слать оповещение о новых комментариях?")

    class Meta(AbstractUser.Meta):
        pass


class Review(models.Model):
    title = models.CharField(max_length=40, verbose_name='Название')
    content = models.TextField(verbose_name="Описание")
    author = models.ForeignKey(AdvUser, on_delete=models.CASCADE, verbose_name="Автор")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True, verbose_name="Опубликовано")
    price = models.IntegerField(verbose_name="Цена")
    is_active = models.BooleanField(default=True, db_index=True, verbose_name="Активный?")
    is_paid = models.BooleanField(default=False, db_index=True, verbose_name="Оплачен?")
    braintree_id = models.CharField(max_length=150, blank=True, verbose_name="ID транзакции")
    country = models.CharField(max_length=60, default='', blank=False, verbose_name="Страна")
    city = models.CharField(max_length=60, default='', blank=False, verbose_name="Город")
    address = models.CharField(max_length=60, default='', blank=False, verbose_name="Адрес далее")
    event_date = models.DateTimeField(auto_now_add=False, auto_now=False, verbose_name="Дата инцидента")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('-is_paid', '-price', 'title', 'created_at')
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'


class AdditionalImage(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE, verbose_name="Отзыв")
    image = models.ImageField(upload_to=get_timestamp_path, verbose_name="Изображение")

    class Meta:
        verbose_name_plural = "Иллюстрации"
        verbose_name = "Иллюстрация"


class Rebuttal(models.Model):
    title = models.CharField(max_length=40, verbose_name='Название')
    content = models.TextField(verbose_name="Описание")
    author = models.ForeignKey(AdvUser, on_delete=models.CASCADE, verbose_name="Автор")
    review = models.ForeignKey(Review, on_delete=models.CASCADE, verbose_name="Отзыв")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True, verbose_name="Опубликовано")
    price = models.IntegerField(verbose_name="Цена")
    is_active = models.BooleanField(default=True, db_index=True, verbose_name="Выводить опровержение?")
    is_paid = models.BooleanField(default=False, db_index=True, verbose_name="Оплачен?")
    braintree_id = models.CharField(max_length=150, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('-is_paid', '-price', 'title', 'created_at')
        verbose_name = 'Опровержение'
        verbose_name_plural = 'Опровержения'


class AdditionalImageReb(models.Model):
    rebuttal = models.ForeignKey(Rebuttal, on_delete=models.CASCADE, verbose_name="Опровержение")
    image = models.ImageField(upload_to=get_timestamp_path, verbose_name="Изображение")

    class Meta:
        verbose_name_plural = "Иллюстрации"
        verbose_name = "Иллюстрация"


class ComplaintsAndSuggestions(models.Model):
    title = models.CharField(max_length=40, verbose_name='Заголовок')
    body = models.TextField(verbose_name="Текст сообшения")
    user_id = models.ForeignKey(AdvUser, on_delete=models.CASCADE, verbose_name="Пользователь")
    created_at = models.DateTimeField(auto_now_add=True, db_index=True, verbose_name="Опубликовано")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ('created_at', 'title')
        verbose_name = 'Жалоба/предложение'
        verbose_name_plural = 'Жалобы/предложения'
