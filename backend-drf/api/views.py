from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import StockPredictionSerializer

class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)  # ✅ FIX

        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            return Response({'status': 'success', 'ticker': ticker},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
