<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Receipt #{{ $transaction->transaction_id }}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f0f9ff;
            color: #1e293b;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 580px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            border: 2px solid #bae6fd;
            box-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            padding: 30px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 900;
        }
        .header p {
            margin: 6px 0 0;
            color: #d1fae5;
            font-size: 13px;
        }
        .body-content {
            padding: 30px;
        }
        .receipt-summary {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 20px;
            margin: 20px 0;
        }
        .summary-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f1f5f9;
            font-size: 13px;
        }
        .summary-row:last-child {
            border-bottom: none;
            font-weight: 900;
            font-size: 15px;
            color: #0f172a;
            padding-top: 12px;
        }
        .cta-btn {
            display: block;
            width: fit-content;
            margin: 25px auto 10px;
            background: linear-gradient(to right, #0284c7, #0369a1);
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 14px;
            font-weight: 800;
            font-size: 14px;
            text-align: center;
        }
        .footer {
            background-color: #f8fafc;
            border-top: 1px solid #e2e8f0;
            padding: 20px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
        }
    </style>
</head>
<body>

    <div class="container">
        <!-- Header -->
        <div class="header">
            <div style="font-size: 36px; margin-bottom: 8px;">💎</div>
            <h1>Top-Up Successful!</h1>
            <p>Your gems have been credited to your mayor balance.</p>
        </div>

        <!-- Body -->
        <div class="body-content">
            <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                Hello <strong>{{ $transaction->user->name }}</strong>,<br>
                Thank you for your purchase. Your payment was processed successfully, and your digital assets are immediately available in-game.
            </p>

            <div class="receipt-summary">
                <div class="summary-row">
                    <span style="color: #64748b;">Order Reference:</span>
                    <span><strong>#{{ $transaction->transaction_id }}</strong></span>
                </div>
                <div class="summary-row">
                    <span style="color: #64748b;">Package:</span>
                    <span>{{ $transaction->package_name ?? 'Gems Pack' }}</span>
                </div>
                <div class="summary-row">
                    <span style="color: #64748b;">Gems Credited:</span>
                    <span style="color: #0284c7; font-weight: 800;">+{{ number_format($transaction->gems_credited) }} 💎</span>
                </div>
                <div class="summary-row">
                    <span style="color: #64748b;">Date & Time:</span>
                    <span>{{ $transaction->created_at->format('M d, Y · H:i') }} UTC</span>
                </div>
                <div class="summary-row">
                    <span>Total Paid:</span>
                    <span>${{ number_format($transaction->amount_cents / 100, 2) }} USD</span>
                </div>
            </div>

            <p style="font-size: 12px; color: #64748b; line-height: 1.5; margin-top: 15px;">
                📎 <em>An official electronic PDF invoice (<strong>invoice-{{ $transaction->transaction_id }}.pdf</strong>) is attached to this email for your records.</em>
            </p>

            <a href="{{ config('app.url', 'http://localhost:8000') }}/play" class="cta-btn">
                Return to Island & Spend Gems →
            </a>
        </div>

        <!-- Footer -->
        <div class="footer">
            {{ config('company.name', 'City Island Games Ltd.') }} · {{ config('company.address', 'Limassol, Cyprus') }}<br>
            Billing support: <a href="mailto:{{ config('company.email', 'info@cityislandclicker.com') }}" style="color: #0284c7;">{{ config('company.email', 'info@cityislandclicker.com') }}</a>
        </div>
    </div>

</body>
</html>
