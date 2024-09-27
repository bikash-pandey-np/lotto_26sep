<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Agent;

class DashboardController extends Controller
{
    public function getDashboard() {
        $agent = auth()->guard('agent')->user();
        return Inertia::render('Agents/Dashboard', [
            'accountInfo' => [
                'balance' => $agent->balance,
                'total_earned' => $agent->total_earned,
                'total_withdraw' => $agent->total_withdraw,
                'total_deposit' => $agent->total_deposit,
            ]
        ]);
    }
}
