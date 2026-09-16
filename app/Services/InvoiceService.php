<?php

namespace App\Services;

use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Barryvdh\DomPDF\PDF as DomPdfInstance;

class InvoiceService
{
    /**
     * Generate a DomPDF instance for the given transaction.
     */
    public function generatePdf(Transaction $transaction): DomPdfInstance
    {
        $transaction->loadMissing('user');

        return Pdf::loadView('invoices.receipt', [
            'transaction' => $transaction,
        ])->setPaper('a4', 'portrait');
    }

    /**
     * Get binary raw PDF content.
     */
    public function getPdfBytes(Transaction $transaction): string
    {
        return $this->generatePdf($transaction)->output();
    }
}
