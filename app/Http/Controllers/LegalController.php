<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    public function terms(): Response
    {
        return Inertia::render('Legal/Terms');
    }

    public function privacy(): Response
    {
        return Inertia::render('Legal/Privacy');
    }

    public function refunds(): Response
    {
        return Inertia::render('Legal/Refunds');
    }

    public function cookies(): Response
    {
        return Inertia::render('Legal/Cookies');
    }
}
