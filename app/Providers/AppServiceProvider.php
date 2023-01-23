<?php

namespace App\Providers;

use App\Contracts\SiswaServiceInterface;
use App\Contracts\UserServiceInterface;
use App\Services\SiswaService;
use App\Services\UserService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->app->singleton(UserServiceInterface::class, UserService::class);
        $this->app->singleton(SiswaServiceInterface::class, SiswaService::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
