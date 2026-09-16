<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\CountryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class RegisterController extends Controller
{
    public function showRegistrationForm(): Response
    {
        return Inertia::render('Auth/Register', [
            'countries' => CountryService::getAllowedCountries(),
        ]);
    }

    public function register(Request $request): RedirectResponse
    {
        $allowedCountries = CountryService::getAllowedCountries();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'surname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'phone' => ['required', 'string', 'max:35'],
            'date_of_birth' => ['required', 'date', 'before:-13 years'],
            'address_street' => ['required', 'string', 'max:255'],
            'address_city' => ['required', 'string', 'max:255'],
            'address_country' => ['required', 'string', 'in:'.implode(',', $allowedCountries)],
            'address_postcode' => ['required', 'string', 'max:20'],
            'terms_accepted' => ['required', 'accepted'],
        ], [
            'terms_accepted.accepted' => 'You must agree to the Terms & Conditions and Privacy Policy to continue.',
            'date_of_birth.before' => 'You must be at least 13 years old to register.',
            'address_country.in' => 'Registration is currently not available from the selected country.',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'],
            'date_of_birth' => $validated['date_of_birth'],
            'address_street' => $validated['address_street'],
            'address_city' => $validated['address_city'],
            'address_country' => $validated['address_country'],
            'address_postcode' => $validated['address_postcode'],
            'terms_accepted_at' => now(),
            'coins' => 250, // Nice starter bonus for new Mayors!
            'gems' => 50,
            'last_sync_at' => now(),
            'session_secret' => Str::random(32),
            'cheat_flags' => 0,
            'total_clicks' => 0,
        ]);

        Auth::login($user);

        return redirect()->route('game.play');
    }
}
