<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{

    public function update (Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
        ]);

        if ($request->hasFile('avatar')) {
            $ext = $request->file('avatar')->extension();

            $user->addMediaFromRequest('avatar')->usingFileName($user->id.'.'.$ext)->toMediaCollection('avatars');
    
            $mediaUrl = $user->getFirstMediaUrl('avatars');

            $user->update([
                'avatar' => $mediaUrl,
                'name' => $request->firstname . ' ' . $request->lastname,
                'phone' => $request->phone
            ]);
        } else {
            $user->update([
                'name' => $request->firstname . ' ' . $request->lastname,
                'phone' => $request->phone
            ]);
       }

       Auth::setUser($user);

        return back()->with('status', 'Profile had been updated');
    }
    
    public function changePass(Request $request)
    {
        $user = auth()->user();
        $request->validate([
            'password' => 'required|string',
            'new_password' => ['required', 'confirmed', Rules\Password::defaults()]
        ]);

        if(!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => 'Wrong password',
            ]);
        }

        $user->update([
            'password' => Hash::make($request->new_password),
        ]);

        return back()->with('status', 'Password had been updated');
    }
}
