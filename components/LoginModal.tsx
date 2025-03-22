import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendVerificationCode, verifyCodeAndSignIn, resetRecaptcha } from '@/services/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'code'
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    try {
      setIsProcessing(true);
      setError('');
      
      const result = await sendVerificationCode(phoneNumber);
      
      if (result.success) {
        if (result.verificationId) {
          setVerificationId(result.verificationId);
          setStep('code');
        } else {
          setError('Verification ID is undefined. Please try again.');
        }
      } else {
        setError('Failed to send verification code. Please try again.');
      }
    } catch (error) {
      console.error("Error in handleSendCode:", error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      setIsProcessing(true);
      setError('');
      
      const result = await verifyCodeAndSignIn(verificationId, verificationCode);
      
      if (result.success) {
        // Close modal after successful login
        resetForm();
        onClose();
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (error) {
      console.error("Error in handleVerifyCode:", error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setPhoneNumber('');
    setVerificationCode('');
    setVerificationId('');
    setStep('phone');
    setError('');
    setIsProcessing(false);
    resetRecaptcha();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{step === 'phone' ? 'Enter your phone number' : 'Enter verification code'}</DialogTitle>
          <DialogDescription>
            {step === 'phone' 
              ? 'We\'ll send you a verification code to login.' 
              : 'Enter the 6-digit code sent to your phone.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {error && (
            <div className="mb-4 p-2 bg-red-50 text-red-600 text-sm rounded">
              {error}
            </div>
          )}
          
          {step === 'phone' ? (
            <div className="space-y-4">
              <Input
                type="tel"
                placeholder="Phone number (e.g., +1234567890)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isProcessing}
              />
              <p className="text-xs text-gray-500">
                Include your country code (e.g., +1 for US)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="6-digit verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
                disabled={isProcessing}
              />
            </div>
          )}
        </div>
        
        <DialogFooter className="flex space-x-2 justify-end">
          <Button 
            variant="outline" 
            onClick={() => {
              if (step === 'code') {
                setStep('phone');
              } else {
                handleClose();
              }
            }}
            disabled={isProcessing}
          >
            {step === 'code' ? 'Back' : 'Cancel'}
          </Button>
          <Button 
            onClick={step === 'phone' ? handleSendCode : handleVerifyCode}
            disabled={isProcessing || (step === 'phone' ? !phoneNumber : !verificationCode)}
          >
            {isProcessing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : step === 'phone' ? 'Send Code' : 'Verify Code'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}