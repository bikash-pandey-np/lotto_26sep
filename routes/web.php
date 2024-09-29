<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // We are going to use this class to render React components
use App\Http\Controllers\Agent\AuthController;
use App\Http\Controllers\Agent\DashboardController;
use App\Http\Controllers\Agent\DepositController;
use App\Http\Controllers\Agent\MoreController;

Route::get('/', function () {
    return Inertia::render('Test'); // This will get component Test.jsx from the resources/js/Pages/Test.jsx
});

Route::post('/become-master', [AuthController::class, 'handleMasterAgentRegister']);
Route::get('/become-master', [AuthController::class, 'getMasterRegisterPage'])
    ->name('become-masteragent');

Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::get('/verify-otp', [AuthController::class, 'getOtpPage'])
    ->name('get_otp_page');

Route::get('/login', [AuthController::class, 'getLogin'])
    ->name('agent.login');
Route::post('/login', [AuthController::class, 'handleLogin']);

Route::get('/register', [AuthController::class, 'getRegister'])
    ->name('agent.register');
Route::post('/register', [AuthController::class, 'handleRegister']);

Route::middleware('agent')->group(function () { 
    Route::get('/dashboard', [DashboardController::class, 'getDashboard'])
        ->name('agent.dashboard');


    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('agent.logout');

    Route::get('/deposit', [DepositController::class, 'getDepositPage'])
        ->name('agent.deposit');
    Route::get('/transfer-history', [DepositController::class, 'depositHistory'])
    ->name('agent.deposit_history');
    Route::post('/transfer-fund', [DepositController::class, 'transferFund'])
        ->name('agent.transfer_funds');

    Route::get('/more', function () {
        return Inertia::render('Agents/More/Index');
    })->name('agent.more');

    Route::get('/events', [MoreController::class, 'getEventPage'])
        ->name('agent_more_event');
    Route::get('/tickets', [MoreController::class, 'getTicketPage'])
    ->name('agent_more_ticket');

    Route::get('/issue-ticket', [MoreController::class, 'getIssueTicketPage'])
        ->name('agent_more_issue_ticket');
    Route::post('/issue-ticket', [MoreController::class, 'issueTicket']);

    Route::get('/earning-logs', [MoreController::class, 'getEarningLogs'])
        ->name('agent_more_earning_logs');
});
