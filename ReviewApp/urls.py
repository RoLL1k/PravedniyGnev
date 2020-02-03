from django.urls import path

from .views import *

app_name = 'ReviewApp'

urlpatterns = [
    path('review/<int:rev_pk>/rebuttal/<int:reb_pk>/detail/', rebuttal_detail, name="get_rebuttal_detail"),
    path('review/<int:rev_pk>/rebuttal/<int:reb_pk>/delete/', RebuttalDelete.as_view(), name="delete_rebuttal"),
    path('review/<int:rev_pk>/rebuttal/<int:reb_pk>/update/', RebuttalUpdate.as_view(), name="update_rebuttal"),
    path('review/<int:pk>/rebuttal/add/', RebuttalCreate.as_view(), name="add_rebuttal"),
    path('review/<int:pk>/rebuttals/', rebuttals_list, name="get_rebuttals_list"),
    path('review/<int:pk>/detail/', review_detail, name="get_review_detail"),
    path('review/<int:pk>/delete/', ReviewDelete.as_view(), name="delete_review"),
    path('review/<int:pk>/update/', ReviewUpdate.as_view(), name="update_review"),
    path('review/add/', ReviewCreate.as_view(), name="add_review"),
    path('reviews/', reviews_list, name="get_reviews_list"),
    path('info-page/', redirect_to_info, name="get_info"),
    path('accounts/register/', RegisterUserView.as_view(), name='register'),
    path('accounts/profile/add_complaint/', ComSugCreate.as_view(), name='add_complaint'),
    path('accounts/profile/change-user-info', ChangeUserInfoView.as_view(), name="change_user_info"),
    path('accounts/profile/password/change/', UserPasswordChangeView.as_view(), name='password_change'),
    path('accounts/password/reset/done/', UserPasswordResetDoneView.as_view(), name='password_reset_done'),
    path('accounts/password/reset/', UserPasswordResetView.as_view(), name='password_reset'),
    path('accounts/password/confirm/complete/', UserPasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('accounts/password/confirm/<uidb64>/<token>/', UserPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('accounts/profile/review/<int:rev_pk>/rebuttal<int:reb_pk>/delete', ProfRebuttalDelete.as_view(), name="prof_rebuttal_delete"),
    path('accounts/profile/review/<int:rev_pk>/rebuttal<int:reb_pk>/detail', prof_rebuttal_detail, name="prof_rebuttal_detail"),
    path('accounts/profile/review/<int:pk>/delete', ProfReviewDelete.as_view(), name="rev_prof_delete"),
    path('accounts/profile/review/<int:pk>/rebuttals', review_profile_rebuttals_on_me, name="rev_prof_rebuttals_on_me"),
    path('accounts/profile/review/<int:pk>/detail', prof_review_detail, name="prof_review_detail"),
    path('accounts/profile/rebuttals-on-me', profile_rebuttals_on_me, name="profile_rebuttals_on_me"),
    path('accounts/profile/rebuttals', profile_rebuttals, name="profile_rebuttals"),
    path('accounts/profile/reviews', profile_reviews, name="profile_reviews"),
    path('accounts/profile/', profile, name="profile"),
    path('accounts/logout/', logout_request, name="logout"),
    path('accounts/login/', LoginUser.as_view(), name="login"),
    path('', main, name="main"),
]
