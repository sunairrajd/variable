'use client'




import React, { useState, useEffect } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { initializeApp } from "firebase/app"; // Import Firebase app initialization
import { app,auth } from '../../services/firebase'; // Adjust the import path as necessary


// Initialize Firebase

function PhoneSignin() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');

    const handlePhoneNumberChange = (value) => {
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
            .then((confirmationResult) => {
                // SMS sent. Prompt user to enter the code from the message.
                window.confirmationResult = confirmationResult; // Store confirmationResult to verify OTP later
                alert('OTP sent!');
            }).catch((error) => {
                // Handle Errors here.
                console.error("Error during signInWithPhoneNumber", error);
                alert('Error sending OTP. Please try again.');
            });
    };

    const handleVerify = () => {
        window.confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
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
                onChange={(e) => handlePhoneNumberChange(e.target.value)} 
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