import { 
    getAuth, 
    RecaptchaVerifier, 
    signInWithPhoneNumber, 
    signOut, 
    PhoneAuthProvider, 
    signInWithCredential,
    onAuthStateChanged,
    User
  } from "firebase/auth";
  import { initializeApp } from "firebase/app";
  import { useState, useEffect } from 'react';
  
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
  };
  
  // Initialize Firebase app if it hasn't been initialized yet
  let app;
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    // App already initialized
    console.error("Firebase initialization error", error);
  }
  
  // Get auth instance
  export const auth = getAuth(app);
  
  // Setup invisible reCAPTCHA
  export const setupRecaptcha = (containerId = 'recaptcha-container') => {
    if (typeof window === 'undefined') return null;
    
    try {
      // Clear any existing reCAPTCHA to avoid duplicates
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      
      // Make sure the container exists
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`reCAPTCHA container #${containerId} not found`);
        return null;
      }
      
      // Create new reCAPTCHA verifier
      window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        'size': 'invisible',
        'callback': () => {
          console.log('reCAPTCHA verified');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          // Reset on expiry
          if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
          }
        }
      });
      
      // Render the reCAPTCHA to ensure it's ready
      window.recaptchaVerifier.render();
      
      return window.recaptchaVerifier;
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      return null;
    }
  };
  
  // Send verification code
  export const sendVerificationCode = async (phoneNumber: string) => {
    try {
      // Format phone number (add country code if not present)
      let formattedPhone = phoneNumber;
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = `+91${formattedPhone}`; // Default to US (+1)
      }
      
      const appVerifier = setupRecaptcha();
      if (!appVerifier) {
        return { 
          success: false, 
          error: new Error('Failed to set up reCAPTCHA verification') 
        };
      }
      
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      return { success: true, verificationId: confirmationResult.verificationId };
    } catch (error) {
      console.error("Error sending verification code:", error);
      // Reset reCAPTCHA
      resetRecaptcha();
      return { success: false, error };
    }
  };
  
  // Verify code and sign in
  export const verifyCodeAndSignIn = async (verificationId: string, verificationCode: string) => {
    try {
      // Create credential with the verification ID and code
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      
      // Sign in with credential
      const result = await signInWithCredential(auth, credential);
      return { success: true, user: result.user };
    } catch (error) {
      console.error("Error verifying code:", error);
      return { success: false, error };
    }
  };
  
  // Sign out
  export const logoutUser = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error("Error during logout:", error);
      return { success: false, error };
    }
  };
  
  // Reset reCAPTCHA
  export const resetRecaptcha = () => {
    if (typeof window !== 'undefined' && window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  };
  
  // Custom hook to get the current user
  export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);
  
    return { user, loading };
  };
  
  // Add TypeScript declaration for the recaptchaVerifier on window
  declare global {
    interface Window {
      recaptchaVerifier: any;
    }
  }