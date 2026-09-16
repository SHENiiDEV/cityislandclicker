<?php

namespace Tests\Feature;

use App\Models\Upgrade;
use App\Models\User;
use App\Services\GameSyncService;
use App\Services\PaymentService;
use Database\Seeders\UpgradeSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GameSystemTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(UpgradeSeeder::class);

        $this->user = User::create([
            'name' => 'Мэр Тестер',
            'email' => 'mayor_test@example.com',
            'password' => bcrypt('secret123'),
            'coins' => 200,
            'gems' => 50,
            'last_sync_at' => now()->subMinutes(10),
        ]);
    }

    public function test_landing_page_renders_successfully(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_guest_is_redirected_to_login_when_accessing_play(): void
    {
        $response = $this->get('/play');
        $response->assertRedirect('/login');
    }

    public function test_guest_cannot_sync_game_state(): void
    {
        $response = $this->postJson('/api/game/sync', [
            'clicks' => 10,
            'elapsed_seconds' => 5,
            'purchases' => [],
        ]);
        $response->assertStatus(401);
    }

    public function test_game_page_renders_with_user_state(): void
    {
        $response = $this->actingAs($this->user)->get('/play');
        $response->assertStatus(200);
    }

    public function test_legitimate_game_sync_updates_coins(): void
    {
        $initialCoins = $this->user->coins;

        $response = $this->actingAs($this->user)->postJson('/api/game/sync', [
            'clicks' => 20,
            'elapsed_seconds' => 10,
            'purchases' => [],
        ]);

        $response->assertStatus(200);
        $response->assertJson(['success' => true]);

        $this->user->refresh();
        $this->assertGreaterThan($initialCoins, $this->user->coins);
        $this->assertEquals(0, $this->user->cheat_flags);
    }

    public function test_anticheat_flags_excessive_cps(): void
    {
        $this->user->last_sync_at = now()->subSeconds(2);
        $this->user->save();

        // 500 clicks in 2 seconds is 250 CPS (physically impossible)
        $response = $this->actingAs($this->user)->postJson('/api/game/sync', [
            'clicks' => 500,
            'elapsed_seconds' => 2,
            'purchases' => [],
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'is_flagged' => true,
        ]);

        $this->user->refresh();
        $this->assertGreaterThan(0, $this->user->cheat_flags);
    }

    public function test_offline_bonus_calculation_and_claim(): void
    {
        // Give user passive building
        $scout = Upgrade::where('key', 'island_scout')->first();
        $this->user->userUpgrades()->create([
            'upgrade_id' => $scout->id,
            'level' => 10, // 10 coins/sec
        ]);
        $this->user->last_sync_at = now()->subMinutes(5); // 300 seconds
        $this->user->save();

        $syncService = app(GameSyncService::class);
        $offline = $syncService->getOfflineProgress($this->user);

        $this->assertTrue($offline['has_bonus']);
        $this->assertGreaterThan(0, $offline['offline_coins']);

        // Claim regular
        $claimRes = $syncService->claimOfflineBonus($this->user, false);
        $this->assertTrue($claimRes['success']);
        $this->assertGreaterThan(200, $claimRes['new_coins']);
    }

    public function test_payment_checkout_and_idempotent_webhook(): void
    {
        $paymentService = app(PaymentService::class);

        // 1. Checkout
        $checkout = $paymentService->createCheckout($this->user, 'starter_pack');
        $this->assertTrue($checkout['success']);
        $orderId = $checkout['order_id'];

        // 2. Webhook 1st call
        $webRes1 = $paymentService->processWebhook($orderId, ['test' => true]);
        $this->assertTrue($webRes1['success']);
        $this->assertFalse($webRes1['already_processed']);
        $this->assertEquals(100, $webRes1['gems_awarded']);

        $this->user->refresh();
        $this->assertEquals(150, $this->user->gems); // 50 initial + 100

        // 3. Webhook 2nd call (idempotency test)
        $webRes2 = $paymentService->processWebhook($orderId, ['test' => true]);
        $this->assertTrue($webRes2['success']);
        $this->assertTrue($webRes2['already_processed']);

        $this->user->refresh();
        // Gems must still be 150, NOT doubled!
        $this->assertEquals(150, $this->user->gems);
    }

    public function test_sync_processes_upgrade_purchases_accurately(): void
    {
        $this->user->coins = 1000;
        $this->user->last_sync_at = now()->subSeconds(10);
        $this->user->save();

        // Buy 2 wooden shovels (base_cost 15, cost_multiplier 1.15)
        // Level 0 -> cost 15
        // Level 1 -> cost round(15 * 1.15) = 17
        // Total cost = 32
        $response = $this->actingAs($this->user)->postJson('/api/game/sync', [
            'clicks' => 10,
            'elapsed_seconds' => 10,
            'purchases' => [
                ['upgrade_key' => 'wooden_shovel', 'count' => 2],
            ],
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'tap_power' => 3, // base 1 + (2 * 1) = 3
        ]);

        $this->user->refresh();
        $userUpgrade = $this->user->userUpgrades()->whereHas('upgrade', fn ($q) => $q->where('key', 'wooden_shovel'))->first();
        $this->assertNotNull($userUpgrade);
        $this->assertEquals(2, $userUpgrade->level);
    }

    public function test_legal_and_compliance_pages_render_successfully(): void
    {
        $this->get('/terms')->assertStatus(200);
        $this->get('/privacy')->assertStatus(200);
        $this->get('/refunds')->assertStatus(200);
        $this->get('/cookies')->assertStatus(200);
    }

    public function test_news_pages_render_successfully(): void
    {
        $this->get('/news')->assertStatus(200);
        $this->get('/news/patch-1-2-orion-spaceport-launch')->assertStatus(200);
    }
}
