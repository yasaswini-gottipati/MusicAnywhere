from django.urls import path
from . import views

urlpatterns = [
    path('room',views.RoomView.as_view()),
    path('create-room',views.CreateRoomView.as_view()),
    path('get-room',views.GetRoom.as_view()),
    path('join-room',views.JoinRoom.as_view()),
    path('user-in-room',views.UserInRoom.as_view()),
    path('leave-room',views.LeaveRoom.as_view()),
    path('update-room',views.UpdateRoom.as_view())
]