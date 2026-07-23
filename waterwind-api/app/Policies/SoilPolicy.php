<?php

namespace App\Policies;

use App\Models\Soil;
use App\Models\User;

class SoilPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Soil $soil): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Soil $soil): bool
    {
        return true;
    }

    public function delete(User $user, Soil $soil): bool
    {
        return true;
    }
}
