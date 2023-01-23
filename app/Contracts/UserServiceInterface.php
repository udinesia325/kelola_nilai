<?php

namespace App\Contracts;


interface UserServiceInterface
{
    public function import($file):void;
}
