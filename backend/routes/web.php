<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['message' => 'ShipFlow API', 'docs' => '/api'];
});
