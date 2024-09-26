<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LEvent;
use Inertia\Inertia;

class MoreController extends Controller
{
    public function getEventPage()
    {
        $events = LEvent::latest()->get();

        return Inertia::render('Agents/More/Event', [
            'events' => $events
        ]);        
    }

    public function getTicketPage()
    {
        return Inertia::render('Agents/More/Ticket');
    }
}
