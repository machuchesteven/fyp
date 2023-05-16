from .views import PenaltyViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'penalty', PenaltyViewSet)
urlpatterns = router.urls