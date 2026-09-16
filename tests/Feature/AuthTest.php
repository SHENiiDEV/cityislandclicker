<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\UpgradeSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(UpgradeSeeder::class);
    }

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');
        $response->assertStatus(200);
    }

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');
        $response->assertStatus(200);
    }

    public function test_terms_and_privacy_pages_render(): void
    {
        $resTerms = $this->get('/terms');
        $resTerms->assertStatus(200);

        $resPrivacy = $this->get('/privacy');
        $resPrivacy->assertStatus(200);
    }

    public function test_user_can_register_with_all_required_profile_and_address_fields(): void
    {
        $response = $this->post('/register', [
            'name' => 'John',
            'surname' => 'Doe',
            'email' => 'john.doe@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => '+1 305 555 0199',
            'date_of_birth' => '1995-05-15',
            'address_street' => '742 Evergreen Terrace, Apt 1',
            'address_city' => 'Springfield',
            'address_country' => 'United States',
            'address_postcode' => '97477',
            'terms_accepted' => '1',
        ]);

        $response->assertRedirect('/play');
        $this->assertAuthenticated();

        $user = User::where('email', 'john.doe@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals('John', $user->name);
        $this->assertEquals('Doe', $user->surname);
        $this->assertEquals('+1 305 555 0199', $user->phone);
        $this->assertEquals('Springfield', $user->address_city);
        $this->assertEquals('United States', $user->address_country);
        $this->assertEquals('97477', $user->address_postcode);
        $this->assertNotNull($user->terms_accepted_at);
        $this->assertGreaterThan(0, $user->coins);
        $this->assertGreaterThan(0, $user->gems);
    }

    public function test_registration_fails_without_terms_acceptance(): void
    {
        $response = $this->post('/register', [
            'name' => 'John',
            'surname' => 'Doe',
            'email' => 'john.doe@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => '+1 305 555 0199',
            'date_of_birth' => '1995-05-15',
            'address_street' => '742 Evergreen Terrace',
            'address_city' => 'Springfield',
            'address_country' => 'United States',
            'address_postcode' => '97477',
            'terms_accepted' => '0',
        ]);

        $response->assertSessionHasErrors('terms_accepted');
        $this->assertGuest();
    }

    public function test_registration_fails_for_excluded_countries(): void
    {
        $excluded = [
            'Russia',
            'Iran',
            'North Korea',
            'Sudan',
            'Cuba',
            'Syria',
            'Venezuela',
        ];

        foreach ($excluded as $country) {
            $response = $this->post('/register', [
                'name' => 'Test',
                'surname' => 'User',
                'email' => "user_{$country}@example.com",
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'phone' => '+1 305 555 0199',
                'date_of_birth' => '1995-05-15',
                'address_street' => '123 Main St',
                'address_city' => 'Metropolis',
                'address_country' => $country,
                'address_postcode' => '10001',
                'terms_accepted' => '1',
            ]);

            $response->assertSessionHasErrors('address_country');
        }
    }

    public function test_user_can_login_and_logout(): void
    {
        $user = User::create([
            'name' => 'Alice',
            'surname' => 'Smith',
            'email' => 'alice@example.com',
            'password' => bcrypt('secret123'),
            'terms_accepted_at' => now(),
        ]);

        $loginRes = $this->post('/login', [
            'email' => 'alice@example.com',
            'password' => 'secret123',
        ]);

        $loginRes->assertRedirect('/play');
        $this->assertAuthenticatedAs($user);

        $logoutRes = $this->post('/logout');
        $logoutRes->assertRedirect('/');
        $this->assertGuest();
    }
}
