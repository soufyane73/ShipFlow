<?php

return [

    'defaults' => [
        'guard' => 'api',
        'passwords' => 'profiles',
    ],

    'guards' => [
        'api' => [
            'driver' => 'jwt',
            'provider' => 'profiles',
            'hash' => false,
        ],
    ],

    'providers' => [
        'profiles' => [
            'driver' => 'eloquent',
            'model' => App\Models\Profile::class,
        ],
    ],

    'passwords' => [
        'profiles' => [
            'provider' => 'profiles',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,

];
