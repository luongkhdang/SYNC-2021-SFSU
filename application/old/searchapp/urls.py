from django.urls import path

from .views import homepage, SearchResultsView, add_room, SearchByGenreView, SearchByNameView, searchbygenrepage, searchbynamepage, add_confirmation, submitpage

urlpatterns = [
    path('search/', SearchResultsView.as_view(), name='search_results'),
    path('searchname/', searchbynamepage, name='searchbyname'),
    path('searchgenre/', searchbygenrepage, name='searchbygenre'),
    path('searchgenreview/', SearchByGenreView.as_view(), name='searchbygenre_view'),
    path('searchnameview/', SearchByNameView.as_view(), name='searchbyname_view'),
    path('add/', add_room, name="add_room"),
    path('room/', submitpage, name="room"),
    path('addconfirmation/', add_confirmation.as_view(), name="add_confirmation"),
    path('', homepage, name='home'),
    #path('', showform().as_view(), name='home'),
]