<?php

namespace App\Enums;

enum RecommendationStatus: string
{
    case Excellent = 'Excellent';
    case VeryGood = 'Very Good';
    case Acceptable = 'Acceptable';
    case Poor = 'Poor';
    case NotRecommended = 'Not Recommended';

    public static function fromScore(float $score): self
    {
        return match (true) {
            $score >= 80 => self::Excellent,
            $score >= 60 => self::VeryGood,
            $score >= 40 => self::Acceptable,
            $score >= 20 => self::Poor,
            default => self::NotRecommended,
        };
    }

    public function label(): string
    {
        return $this->value;
    }
}
