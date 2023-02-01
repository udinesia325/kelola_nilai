<?php

namespace App\Providers;

use App\Contracts\NilaiServiceInterface;
use App\Contracts\SiswaServiceInterface;
use App\Contracts\UserServiceInterface;
use App\Contracts\NilaiRepositoryInterface;
use App\Contracts\RekapanRepositoryInterface;
use App\Repositories\NilaiRepository;
use App\Repositories\RekapanRepository;
use App\Services\NilaiService;
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
        $this->app->singleton(NilaiServiceInterface::class, NilaiService::class);
        $this->app->singleton(NilaiRepositoryInterface::class, NilaiRepository::class);
        $this->app->singleton(RekapanRepositoryInterface::class, RekapanRepository::class);
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
