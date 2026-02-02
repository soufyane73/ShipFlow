<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/debug-headers', function (Request $request) {
    return response()->json([
        'headers' => $request->headers->all(),
        'auth_header' => $request->header('Authorization'),
    ]);
});
