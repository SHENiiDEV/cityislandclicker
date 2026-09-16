<?php

namespace App\Http\Controllers;

use App\Services\NewsService;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('News/Index', [
            'articles' => NewsService::all(),
        ]);
    }

    public function show(string $slug): Response
    {
        $article = NewsService::findBySlug($slug);

        if (! $article) {
            abort(404, 'Article not found');
        }

        $all = NewsService::all();
        $related = array_values(array_filter($all, fn ($a) => $a['slug'] !== $slug));

        return Inertia::render('News/Show', [
            'article' => $article,
            'relatedArticles' => array_slice($related, 0, 3),
        ]);
    }
}
