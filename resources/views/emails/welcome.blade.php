<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to City Island!</title>
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
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            padding: 35px 30px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 900;
            letter-spacing: -0.5px;
        }
        .header p {
            margin: 8px 0 0;
            color: #e0f2fe;
            font-size: 14px;
            font-weight: 500;
        }
        .body-content {
            padding: 30px;
        }
        .bonus-card {
            background-color: #fef3c7;
            border: 2px solid #fde68a;
            border-radius: 18px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
        }
        .bonus-badge {
            font-size: 11px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #92400e;
        }
        .bonus-items {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 10px;
            font-size: 18px;
            font-weight: 900;
            color: #78350f;
        }
        .cta-btn {
            display: block;
            width: fit-content;
            margin: 25px auto 10px;
            background: linear-gradient(to right, #f59e0b, #d97706);
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 16px;
            font-weight: 900;
            font-size: 15px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(217, 119, 6, 0.35);
        }
        .tips-list {
            background-color: #f8fafc;
            border-radius: 16px;
            padding: 20px;
            margin: 20px 0;
            font-size: 13px;
            color: #475569;
            line-height: 1.6;
        }
        .tips-list li {
            margin-bottom: 8px;
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
            <div style="font-size: 40px; margin-bottom: 10px;">🏝️</div>
            <h1>Welcome, Mayor {{ $user->name }}!</h1>
            <p>Your island citizenship & charter have been officially granted.</p>
        </div>

        <!-- Body Content -->
        <div class="body-content">
            <p style="font-size: 15px; line-height: 1.6; color: #334155;">
                We are thrilled to welcome you to <strong>City Island Clicker</strong>! A pristine plot of tropical land is waiting for you to transform it into a bustling metropolis of resorts, wind farms, and orbital spaceports.
            </p>

            <!-- Starter Bonus Card -->
            <div class="bonus-card">
                <div class="bonus-badge">🎁 Your Mayor Starter Pack Credited</div>
                <div class="bonus-items">
                    <span>🪙 250 Gold Coins</span>
                    <span>·</span>
                    <span>💎 50 Free Gems</span>
                </div>
            </div>

            <!-- Quick Pro Tips -->
            <div class="tips-list">
                <strong style="color: #0f172a; display: block; margin-bottom: 10px;">🚀 Pro Tips for Quick Expansion:</strong>
                <ul style="padding-left: 20px; margin: 0;">
                    <li><strong>Streak Combos:</strong> Tap rapidly to trigger the 3× Combo Multiplier.</li>
                    <li><strong>24/7 Passive Income:</strong> Buy Harbours and Resorts — they earn gold even when your browser is closed.</li>
                    <li><strong>Offline Bonus:</strong> When you return, use your starter gems to <strong>Double</strong> your offline earnings!</li>
                </ul>
            </div>

            <a href="{{ config('app.url', 'http://localhost:8000') }}/play" class="cta-btn">
                Launch My Island Now →
            </a>
        </div>

        <!-- Footer -->
        <div class="footer">
            {{ config('company.name', 'City Island Games Ltd.') }} · {{ config('company.address', 'Limassol, Cyprus') }}<br>
            Need assistance? Email us at <a href="mailto:{{ config('company.email', 'info@cityislandclicker.com') }}" style="color: #0284c7;">{{ config('company.email', 'info@cityislandclicker.com') }}</a>
        </div>
    </div>

</body>
</html>
