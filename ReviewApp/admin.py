from django.contrib import admin
from .models import *


class ReviewInline(admin.TabularInline):
    model = Review
    extra = 0


class RebuttalInline(admin.TabularInline):
    model = Rebuttal
    extra = 0


class AdditionalImageInline(admin.TabularInline):
    model = AdditionalImage
    extra = 0


class AdditionalImageRebInline(admin.TabularInline):
    model = AdditionalImageReb
    extra = 0


class AdvUserAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'is_active', 'date_joined')
    search_fields = ('username', 'email')
    fields = (('username',), ('password',), ('email',),
              ('send_messages', 'is_activated'), ('is_active',),
              ('last_login',), ('date_joined',))
    readonly_fields = ('last_login', 'date_joined')
    inlines = (ReviewInline, RebuttalInline,)


class ReviewAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'price', 'created_at', 'is_active', 'is_paid')
    search_fields = ('price', 'title', 'content', 'author')
    date_hierarchy = 'created_at'
    fields = ('title', 'content', 'author', 'price', 'is_active', 'is_paid', 'event_date', 'created_at', 'braintree_id')
    readonly_fields = ('created_at',)
    inlines = (AdditionalImageInline, )


class RebuttalAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'review', 'price', 'created_at', 'is_active', 'is_paid')
    search_fields = ('price', 'title', 'content', 'author')
    date_hierarchy = 'created_at'
    fields = ('title', 'content', 'review', 'author', 'price', 'is_active', 'is_paid', 'created_at', 'braintree_id')
    readonly_fields = ('created_at',)
    inlines = (AdditionalImageRebInline, )


class ComplaintsAndSuggestionsAdmin(admin.ModelAdmin):
    list_display = ('title', 'user_id', 'created_at')
    search_fields = ('title', 'user_id', 'created_at')
    date_hierarchy = 'created_at'
    fields = ('title', 'body', 'user_id', 'created_at')
    readonly_fields = ('created_at',)


admin.site.register(AdvUser, AdvUserAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Rebuttal, RebuttalAdmin)
admin.site.register(ComplaintsAndSuggestions, ComplaintsAndSuggestionsAdmin)

