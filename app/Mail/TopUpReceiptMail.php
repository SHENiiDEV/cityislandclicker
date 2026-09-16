<?php

namespace App\Mail;

use App\Models\Transaction;
use App\Services\InvoiceService;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Attachment;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TopUpReceiptMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Transaction $transaction,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(
                config('mail.from.address', 'info@cityislandclicker.com'),
                config('mail.from.name', 'City Island Clicker')
            ),
            subject: '💎 Payment Receipt & Invoice #'.$this->transaction->transaction_id.' — City Island Clicker',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.receipt',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        $invoiceService = app(InvoiceService::class);
        $pdfBytes = $invoiceService->getPdfBytes($this->transaction);

        return [
            Attachment::fromData(fn () => $pdfBytes, 'invoice-'.$this->transaction->transaction_id.'.pdf')
                ->withMime('application/pdf'),
        ];
    }
}
