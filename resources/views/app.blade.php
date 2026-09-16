<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="#38bdf8">
    <meta name="description" content="City Island Clicker — tap to mine gold, build resorts, wind farms and a spaceport, and keep earning while you are offline.">

    <title inertia>{{ config('app.name', 'City Island Clicker') }}</title>

    <link rel="icon" href="/favicon.ico" sizes="any">

    {{-- Fredoka + Nunito give the game its chunky cartoon personality --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="h-full bg-[#eff9ff] font-sans text-slate-800 antialiased selection:bg-amber-400 selection:text-amber-950">
    @inertia
</body>
</html>
