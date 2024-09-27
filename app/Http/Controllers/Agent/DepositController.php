<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Auth;
use App\Models\Agent;
use Validator;
use Throwable;
use Log;
use Illuminate\Support\Facades\DB;
use App\Models\AgentDepositLog;

class DepositController extends Controller
{
    public function getDepositPage(Request $request) 
    {
        $agent = Agent::find(Auth::guard('agent')->user()->id);
        
        if(!$agent)
        {
            return back()->with('error', 'Agent not found');
        }

        if($agent->is_masteragent)
        {
            return Inertia::render('Agents/Deposit/Transfer', [
                'balance' => $agent->balance
            ]);
        }
        else{
            $logs = AgentDepositLog::where('transfered_to', Auth::guard('agent')->user()->id)
                ->with('transferedFrom')
                ->orderBy('id', 'desc');

       
        
            if($request->has('date') && $request->date !== null)
            {
                $logs->whereDate('created_at', $request->date);
            }
        
            return Inertia::render('Agents/Deposit/Index', [
                'logs' => $logs->get()
            ]);
        }
    }

    public function depositHistory(Request $request)
    {

        $logs = AgentDepositLog::where('transfered_from', Auth::guard('agent')->user()->id)
            ->with('transferedTo')
            ->orderBy('id', 'desc');

      

        if($request->has('date') && $request->date !== null)
        {
            $logs->whereDate('created_at', $request->date);
        }


        return Inertia::render('Agents/Deposit/HistoryForMaster', [
            'logs' => $logs->get(),
        ]);
        
    }

    public function transferFund(Request $request)
    {
        $agent = Agent::find(Auth::guard('agent')->user()->id);
        
        if(!$agent)
        {
            return back()->with('error', 'Not Logged in!');
        }

        if(!$agent->is_masteragent)
        {
            return back()->with('error', 'Only For MasterAgent');
        }

        $requestData = [
            'agent_code' => 'AGNT-'.$request->agent_code,
            'amount' => $request->amount
        ];
        $validate = Validator::make($requestData, [
            'agent_code' => 'required|exists:agents,agent_code',
            'amount' => 'required|numeric|min:200',
         ]);
 
         if($validate->fails()){
             return back()->withErrors($validate)->withInput();
         }

         
        //cannot send to self
        if($agent->agent_code === $requestData['agent_code'])
        {
            return back()->with('error', 'Cannot send to self');
        }
         DB::beginTransaction();

         try{
            //check if agent have sufficient balance to tarnsfer 
            if(!($agent->balance > $request->amount))
            {

                return back()->with('error', 'Insufficient Balance');
            }

            $toTransferAgent = Agent::where('agent_code', $requestData['agent_code'])->first();


            //cannot transfer to master agent 
            if($toTransferAgent->is_masteragent)
            {
                return back()->with('error', 'Transfer not alloweded to masteragent');
            }
            $toTransferAgent->balance += $request->amount;

            $agent->balance -= $request->amount;

            $toTransferAgent->total_deposit += $request->amount;


            $toTransferAgent->save();
            $agent->save();

            AgentDepositLog::create([
                'amount' => $request->amount,
                'type' => 'agent',
                'transfered_to' => $toTransferAgent->id,
                'transfered_from' => $agent->id,
                'datetime' => now(),

            ]);

            DB::commit();
            return back()->with('success', 'Transfer Successful!');

         }
         catch(Throwable $th)
         {
            DB::rollBack();
            Log::error('@transferFund ' . $th->getMessage() .' ERROR AT LINE @ ' . $th->getLine());

            return back()->with('error', 'Something went wrong !');
         }


    }
}
