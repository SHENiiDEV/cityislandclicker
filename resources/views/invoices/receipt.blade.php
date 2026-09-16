<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice #{{ $transaction->transaction_id }}</title>
    <style>
        @page {
            margin: 25px 30px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1e293b;
            font-size: 13px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
        .header-table {
            width: 100%;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 20px;
            margin-bottom: 25px;
        }
        .logo-title {
            font-size: 24px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -0.5px;
        }
        .logo-subtitle {
            font-size: 11px;
            font-weight: bold;
            color: #d97706;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .invoice-badge {
            background-color: #ecfdf5;
            border: 1px solid #a7f3d0;
            color: #047857;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            display: inline-block;
        }
        .info-table {
            width: 100%;
            margin-bottom: 30px;
        }
        .info-col {
            width: 50%;
            vertical-align: top;
        }
        .info-heading {
            font-size: 10px;
            font-weight: 900;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 6px;
        }
        .info-text {
            color: #334155;
            font-size: 12px;
            line-height: 1.6;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .items-table th {
            background-color: #f8fafc;
            border-bottom: 2px solid #cbd5e1;
            padding: 10px 14px;
            text-align: left;
            font-size: 10px;
            font-weight: 900;
            text-transform: uppercase;
            color: #475569;
            letter-spacing: 0.5px;
        }
        .items-table td {
            padding: 12px 14px;
            border-bottom: 1px solid #f1f5f9;
            font-size: 12px;
        }
        .text-right {
            text-align: right;
        }
        .totals-table {
            width: 100%;
            margin-bottom: 30px;
        }
        .totals-table td {
            padding: 4px 0;
            font-size: 12px;
        }
        .total-row td {
            border-top: 2px solid #0f172a;
            padding-top: 10px;
            font-size: 15px;
            font-weight: 900;
            color: #0f172a;
        }
        .footer {
            margin-top: 40px;
            border-top: 1px solid #e2e8f0;
            padding-top: 15px;
            font-size: 10px;
            color: #94a3b8;
            text-align: center;
            line-height: 1.6;
        }
    </style>
</head>
<body>

    <!-- Header -->
    <table class="header-table">
        <tr>
            <td style="vertical-align: middle;">
                <div class="logo-title">🏝️ City Island Clicker</div>
                <div class="logo-subtitle">Official Payment Receipt & Invoice</div>
            </td>
            <td class="text-right" style="vertical-align: middle;">
                <span class="invoice-badge">Payment Completed</span>
                <div style="font-size: 18px; font-weight: 900; color: #0f172a; margin-top: 6px;">
                    #{{ $transaction->transaction_id }}
                </div>
                <div style="font-size: 11px; color: #64748b;">
                    Date: {{ $transaction->created_at->format('M d, Y · H:i:s') }} UTC
                </div>
            </td>
        </tr>
    </table>

    <!-- Info Sections -->
    <table class="info-table">
        <tr>
            <td class="info-col">
                <div class="info-heading">Issued By (Merchant)</div>
                <div class="info-text">
                    <strong>{{ config('company.name', 'City Island Games Ltd.') }}</strong><br>
                    Registration No: {{ config('company.number', 'HE 492019') }}<br>
                    {{ config('company.address', 'Arch. Makariou III, 284, Fortuna Court, Block B, 2nd floor, 3105, Limassol, Cyprus') }}<br>
                    Email: {{ config('company.email', 'info@cityislandclicker.com') }}
                </div>
            </td>
            <td class="info-col" style="padding-left: 20px;">
                <div class="info-heading">Billed To (Customer)</div>
                <div class="info-text">
                    <strong>{{ $transaction->user->name }} {{ $transaction->user->surname ?? '' }}</strong><br>
                    Email: {{ $transaction->user->email }}<br>
                    @if($transaction->user->address_street)
                        Address: {{ $transaction->user->address_street }}, {{ $transaction->user->address_city ?? '' }}<br>
                        {{ $transaction->user->address_country ?? '' }} {{ $transaction->user->address_postcode ?? '' }}<br>
                    @endif
                    Account ID: #{{ $transaction->user_id }}
                </div>
            </td>
        </tr>
    </table>

    <!-- Line Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 50%;">Item Description</th>
                <th style="width: 15%;" class="text-right">Qty</th>
                <th style="width: 15%;" class="text-right">Unit Price</th>
                <th style="width: 20%;" class="text-right">Total Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong>{{ $transaction->package_name ?? 'Virtual Island Top-Up' }}</strong><br>
                    <span style="font-size: 10px; color: #64748b;">
                        +{{ number_format($transaction->gems_credited) }} Premium Gems credited directly to mayor wallet
                    </span>
                </td>
                <td class="text-right">1</td>
                <td class="text-right">${{ number_format($transaction->amount_cents / 100, 2) }}</td>
                <td class="text-right"><strong>${{ number_format($transaction->amount_cents / 100, 2) }}</strong></td>
            </tr>
        </tbody>
    </table>

    <!-- Totals -->
    <table style="width: 100%;">
        <tr>
            <td style="width: 55%; vertical-align: top;">
                <div class="info-heading">Payment Method & Verification</div>
                <div class="info-text" style="font-size: 11px;">
                    Method: <strong>Credit/Debit Card (Visa / Mastercard)</strong><br>
                    Gateway Status: <strong>Approved & Settled</strong><br>
                    Security: <strong>PCI DSS Level 1 Compliant · 256-Bit SSL</strong>
                </div>
            </td>
            <td style="width: 45%; vertical-align: top;">
                <table class="totals-table">
                    <tr>
                        <td class="text-right" style="color: #64748b;">Subtotal:</td>
                        <td class="text-right" style="width: 100px;">${{ number_format($transaction->amount_cents / 100, 2) }}</td>
                    </tr>
                    <tr>
                        <td class="text-right" style="color: #64748b;">VAT / Sales Tax (0%):</td>
                        <td class="text-right" style="width: 100px;">$0.00</td>
                    </tr>
                    <tr class="total-row">
                        <td class="text-right">Total Paid (USD):</td>
                        <td class="text-right">${{ number_format($transaction->amount_cents / 100, 2) }}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

    <!-- Footer Note -->
    <div class="footer">
        Thank you for playing City Island Clicker!<br>
        This document serves as an official electronic receipt. In-game assets are non-transferable digital goods.<br>
        For inquiries or support, contact our billing team at <strong>{{ config('company.email', 'info@cityislandclicker.com') }}</strong>.
    </div>

</body>
</html>
