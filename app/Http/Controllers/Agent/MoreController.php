<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LEvent;
use App\Models\Agent;
use App\Models\EarningLog;
use App\Models\Refferal;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\State;
use App\Models\District;
use App\Models\Ticket;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Models\LocalBody;

class MoreController extends Controller
{
    public function getEventPage()
    {
        $events = LEvent::latest()->get();

        return Inertia::render('Agents/More/Event', [
            'events' => $events
        ]);        
    }

    public function getTicketPage(Request $request)
    {
        $filterMode = false;

        $query = Ticket::with('event')->where('agent_id', Auth::guard('agent')->user()->id);

        if ($request->has('searchTerm') && $request->searchTerm !== null) {
            $filterMode = true;
            $query->where('ticket_no', 'like', '%' . $request->searchTerm . '%')
                ->where('fullname', 'like', '%' . $request->searchTerm . '%')
                ->where('phone_no', 'like', '%' . $request->searchTerm . '%');
        }

        if ($request->has('dateFilter') && $request->dateFilter !== null) {
            $filterMode = true;
            $query->whereDate('created_at', $request->dateFilter);
        }

        if ($request->has('statusFilter') && $request->statusFilter !== null) {
            $filterMode = true;

            if($request->statusFilter === 'active'){    
                $query->where('has_expired', false);
            }else{
                $query->where('has_expired', true);
            }
        }

        if ($request->has('eventFilter') && $request->eventFilter !== null) {
            $filterMode = true;
            $query->where('event_id', $request->eventFilter);
        }


        return Inertia::render('Agents/More/Ticket', [
            'tickets' => $query->get(),
            'events' => LEvent::where('is_completed', false)->get(),
            'filterMode' => $filterMode
        ]);
    }

    public function getIssueTicketPage()
    {
        $balance = Auth::guard('agent')->user()->balance;
        return Inertia::render('Agents/More/IssueTicket', [
            'balance' => $balance,
            'states' => State::all(),
            'districts' => District::all(),
            'local_bodies' => LocalBody::all(),
            'events' => LEvent::where('is_completed', false)->get()
        ]);
    }

    public function issueTicket(Request $request)
    {
        $rules = [
            'event_id' => 'required',
            'fullname' => 'required',
            'phone_no' => 'required',
            'state_id' => 'required|exists:states,id',
            'district_id' => 'required|exists:districts,id',
            'local_body_id' => 'required|exists:local_bodies,id',
            'ward' => 'required',
            'number1' => 'required|integer|min:1|max:100',
            'number2' => 'required|integer|min:1|max:100',
            'number3' => 'required|integer|min:1|max:100',
            'number4' => 'required|integer|min:1|max:100',
            'number5' => 'required|integer|min:1|max:100',
            'number6' => 'required|integer|min:1|max:100',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        //check if the agent has sufficient balance
        $agent = Auth::guard('agent')->user();
        $balance = $agent->balance;
        $ticketPrice = LEvent::find($request->event_id)->ticket_price;

        if ($balance < $ticketPrice) {
            return back()->with('error', 'Insufficient balance');
        }


        DB::beginTransaction();
        try {
            $ticket = Ticket::create([
                'event_id' => $request->event_id,
                'agent_id' => $agent->id,
                'fullname' => $request->fullname,
                'phone_no' => $request->phone_no,
                'state_id' => $request->state_id,
                'district_id' => $request->district_id,
                'local_body_id' => $request->local_body_id,
                'ward' => $request->ward,
                'amount' => $ticketPrice,
                'number1' => $request->number1,
                'number2' => $request->number2,
                'number3' => $request->number3,
                'number4' => $request->number4,
                'number5' => $request->number5,
                'number6' => $request->number6,
            ]);

            $agent->update([
                'balance' => $agent->balance - $ticketPrice
            ]);

            //update 15% of ticket as earning. 
            $earningLog = EarningLog::create([
                'agent_id' => $agent->id,
                'amount' => $ticketPrice * 0.15,
                'remarks' => 'Ticket issued Ticket No. :' . $ticket->ticket_no,
            ]);

            $agent->update([
                'balance' => $agent->balance + $earningLog->amount,
                'total_earning' => $agent->total_earning + $earningLog->amount,
            ]);



            //also reward 10% of the ticket price to the referrer
            $reffer = Refferal::where('refered_to', $agent->id)->first();
            if ($reffer) {
                $referrer = Agent::where('id', $reffer->id)->first();
                $referrer->update([
                    'balance' => $referrer->balance + $ticketPrice * 0.10,
                    'total_earning' => $referrer->total_earning + $ticketPrice * 0.10,
                ]);

                EarningLog::create([
                    'agent_id' => $referrer->id,
                    'amount' => $ticketPrice * 0.10,
                    'remarks' => 'Refferal reward for ticket No. :' . $ticket->ticket_no,
                ]);
            }

            DB::commit();
            return back()->with('success', 'Ticket issued successfully');
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return back()->with('error', 'Failed to issue ticket');
        }

        


    }


}
