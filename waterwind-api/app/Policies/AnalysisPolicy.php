<?php

namespace App\Policies;

use App\Models\Analysis;
use App\Models\User;

class AnalysisPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, Analysis $analysis): bool
    {
        return $user->id === $analysis->user_id;
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function delete(User $user, Analysis $analysis): bool
    {
        return $user->id === $analysis->user_id;
    }
}
