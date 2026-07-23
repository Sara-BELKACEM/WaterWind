<?php

namespace App\Policies;

use App\Models\Crop;
use App\Models\User;

class CropPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Crop $crop): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, Crop $crop): bool
    {
        return true;
    }

    public function delete(User $user, Crop $crop): bool
    {
        return true;
    }
}
