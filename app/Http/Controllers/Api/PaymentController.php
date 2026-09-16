<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function __construct(
        protected PaymentService $paymentService,
    ) {}

    public function packages(): JsonResponse
    {
        return response()->json([
            'packages' => $this->paymentService->getPackages(),
        ]);
    }

    /**
     * Create pending checkout order
     */
    public function checkout(Request $request): JsonResponse
    {
        $user = Auth::user() ?? User::first();
        if (! $user) {
            return response()->json(['error' => 'Не авторизован'], 401);
        }

        $request->validate([
            'package_key' => 'required|string',
        ]);

        $result = $this->paymentService->createCheckout($user, $request->package_key);

        return response()->json($result);
    }

    /**
     * Webhook or mock confirmation of payment
     */
    public function webhook(Request $request): JsonResponse
    {
        $orderId = $request->input('order_id');
        if (! $orderId) {
            return response()->json(['error' => 'Отсутствует order_id'], 400);
        }

        $result = $this->paymentService->processWebhook($orderId, $request->all());

        return response()->json($result);
    }
}
