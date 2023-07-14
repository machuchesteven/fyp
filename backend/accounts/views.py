from django.shortcuts import render
from django.contrib.auth import login, authenticate, logout
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
    AllowAny,
    IsAuthenticated,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from reporting.models import Report
from rest_framework.status import HTTP_200_OK
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.authentication import SessionAuthentication

# Create your views here.
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ProfileViewSet(APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = User.objects.get(username=request.user.username)
            user_reports = User.objects.reports.all()
            return json.dumps(user_reports)
        return False


class LoginView(APIView):
    permission_classes = [AllowAny]
    # authentication_classes = [SessionAuthentication]

    def post(self, request):
        print(request.data.get("username"))
        print(request.data.get("password"))
        data = request.data
        serializer = LoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        logout(request)
        print(request.user)
        print("User logged out")
        return Response({"message": "Logout Successfully"}, status=HTTP_200_OK)


def reported_view(request):
    if request.method == "POST":
        print(request.POST.get("description"))
        print(request.POST.get("number"))
        print(request.POST.get("violation"))
        print(request.POST.get("image"))
        return "received"
    return False
