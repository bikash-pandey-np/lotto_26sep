<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Validator;
use App\Models\Agent;
use App\Models\Otp;
use Hash;
use Throwable;
use Log;
use Auth;


class AuthController extends Controller
{
    public function getMasterRegisterPage()
    {
        return Inertia::render('Agents/Auth/MasterAgentRegister');        
    }

    public function handleMasterAgentRegister(Request $request)
    {
        $validate = Validator::make($request->all(), [
           'phone' => 'required|min:10|max:10|unique:agents,phone',
           'password' => 'required|min:6',
        ]);

        if($validate->fails()){
            return back()->withErrors($validate)->withInput();
        }

        try{
            Agent::create([
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'is_masteragent' => true
            ]);
            Otp::where('phone', $request->phone)->delete();
            Otp::create([
                'phone' => $request->phone,
                'otp' => '111111',
                // 'otp' => rand(100000, 999999)
            ]);

            return redirect()->route('get_otp_page', ['phone' => $request->phone]);

        }
        catch(Throwable $th)
        {
            Log::error('@handleMasterAgentRegister' . $th->getMessage());
            return back()->with('error', 'Something went wrong!');
        }
    }

    public function getOtpPage(Request $request)
    {
        $phone = $request->phone;
        $agent = Agent::where('phone', $request->phone)->first();

        if($agent->is_phoneverified){
            return redirect()->route('agent.login')->with('success', 'Already Verified!');
        }
        return Inertia::render('Agents/Auth/VerifyOtp', [
            'phone' => $phone
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'phone' => 'required|min:10|max:10|exists:otps,phone',
            'otp' => 'required|min:6|max:6',
         ]);
 
         if($validate->fails()){
             return back()->withErrors($validate)->withInput();
         }

         $otp = Otp::where('phone', $request->phone)->first();

         $agent = Agent::where('phone', $request->phone)->first();

         if($agent->is_phoneverified){
             return back()->with('error', 'You are already verified');
         }
         $agent->is_phoneverified = true;

         $agent->save();

         if($otp->otp == $request->otp){
            return back()->with('success', 'OTP verified successfully');
         }
         else{
            return back()->with('error', 'Invalid OTP');
         }
    }

    public function getLogin() {
        return Inertia::render('Agents/Auth/Login');
    }

    public function handleLogin(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'phone' => 'required|min:10|max:10|exists:agents,phone',
            'password' => 'required|min:6',
        ]);

        if ($validate->fails()) {
            return back()->withErrors($validate)->withInput();
        }

        $agent = Agent::where('phone', $request->phone)->first();

        if (!$agent || !(Auth::guard('agent')->attempt(['phone' => $request->phone, 'password' => $request->password]))) {
            return back()->with('error', 'Invalid phone number or password');
        }

        // Log the agent in
        Auth::guard('agent')->login($agent);

        return redirect()->route('agent.dashboard')
            ->with('success', 'Success');
    }
}
