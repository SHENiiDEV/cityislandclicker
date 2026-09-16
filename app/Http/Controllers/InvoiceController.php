<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\InvoiceService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InvoiceController extends Controller
{
    public function __construct(
        protected InvoiceService $invoiceService,
    ) {}

    public function download(Request $request, string $orderId): Response
    {
        $user = $request->user();

        $transaction = Transaction::where('order_id', $orderId)->first();

        if (! $transaction) {
            abort(404, 'Invoice not found.');
        }

        // Verify that the transaction belongs to the authenticated user
        if ($user && $transaction->user_id !== $user->id) {
            abort(403, 'Unauthorized to view this invoice.');
        }

        $pdf = $this->invoiceService->generatePdf($transaction);

        return response($pdf->output(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="invoice-'.$transaction->transaction_id.'.pdf"',
        ]);
    }
}
