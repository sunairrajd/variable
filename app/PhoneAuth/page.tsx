'use client'

import React, { useState } from 'react';
// import { getAuth } from 'firebase/auth';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';

// import { app } from '../../services/firebase'; // Adjust the import path as necessary
import { auth } from '../../services/firebase'; // Adjust the import path as necessary


// Initialize Firebase

function PhoneSignin() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

    const handlePhoneNumberChange = (value: string) => {
        // Ensure the phone number is in E.164 format
        const formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters
        if (formattedValue.length > 0) {
            setPhoneNumber(`+${formattedValue}`); // Prepend '+' for E.164 format
        } else {
            setPhoneNumber('');
        }
    };

    const handleSubmit = () => {
        const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: () => {
                console.log('recaptcha resolved..');
            }
        });
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((result) => {
                setConfirmationResult(result);
                alert('OTP sent!');
            }).catch((error) => {
                // Handle Errors here.
                console.error("Error during signInWithPhoneNumber", error);
                alert('Error sending OTP. Please try again.');
            });
    };

    const handleVerify = () => {
        if (!confirmationResult) {
            alert('Please request OTP first');
            return;
        }

        confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            console.log('User authenticated:', result.user);
            // You might want to store the user info or redirect them
            alert('Verification successful! User signed in.');
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            console.error("Error during OTP verification", error);
            alert('Error verifying OTP. Please try again.');
        });
    };

    return (
        <div>
            <div id="recaptcha-container"></div>
            <input 
                type="tel"
                value={phoneNumber} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePhoneNumberChange(e.target.value)} 
                placeholder="Enter phone number" 
            />
            <button onClick={handleSubmit}>Submit</button>
            <input 
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                placeholder="Enter OTP" 
            />
            <button onClick={handleVerify}>Verify</button>
        </div>
    )
}

export default PhoneSignin;