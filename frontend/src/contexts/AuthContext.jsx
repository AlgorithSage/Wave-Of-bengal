'use client'

import { createContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    PhoneAuthProvider,
    signInWithCredential
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Helper: fetch or create a Firestore profile, return the role
    const fetchOrCreateProfile = async (firebaseUser) => {
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfile(userData);
            setIsAdmin(userData.role === 'admin');
            return userData.role;
        } else {
            const newProfile = {
                name: firebaseUser.displayName || 'User',
                email: firebaseUser.email || '',
                phone: firebaseUser.phoneNumber || '',
                role: 'customer',
                createdAt: serverTimestamp(),
            };
            await setDoc(userRef, newProfile);
            setProfile(newProfile);
            setIsAdmin(false);
            return 'customer';
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);
            if (firebaseUser) {
                setUser(firebaseUser);
                await fetchOrCreateProfile(firebaseUser);
            } else {
                setUser(null);
                setProfile(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithEmail = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const role = await fetchOrCreateProfile(userCredential.user);
        return { userCredential, role };
    };

    const registerWithEmail = async (name, email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userRef = doc(db, 'users', user.uid);
        const newProfile = {
            name: name,
            email: email,
            role: 'customer',
            createdAt: serverTimestamp()
        };
        await setDoc(userRef, newProfile);
        setProfile(newProfile);
        setIsAdmin(false);

        return { userCredential, role: 'customer' };
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        const role = await fetchOrCreateProfile(userCredential.user);
        return { userCredential, role };
    };

    // Phone Auth: Step 1 — send OTP
    const sendPhoneOtp = async (phoneNumber, recaptchaContainerId) => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerId, {
                size: 'invisible',
                callback: () => { },
            });
        }
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
        window.confirmationResult = confirmationResult;
        return confirmationResult;
    };

    // Phone Auth: Step 2 — verify OTP
    const verifyPhoneOtp = async (otp) => {
        if (!window.confirmationResult) {
            throw new Error('Please request OTP first');
        }
        const userCredential = await window.confirmationResult.confirm(otp);
        const role = await fetchOrCreateProfile(userCredential.user);
        return { userCredential, role };
    };

    const logout = () => {
        // Clean up recaptcha on logout
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
        }
        window.confirmationResult = null;
        return signOut(auth);
    };

    // Update user profile in Firestore (prevents role changes)
    const updateProfile = async (updates) => {
        if (!user) throw new Error('Not authenticated');
        const { role, ...safeUpdates } = updates; // strip role
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { ...safeUpdates, updatedAt: serverTimestamp() });
        // Refresh local state
        const freshDoc = await getDoc(userRef);
        if (freshDoc.exists()) {
            const data = freshDoc.data();
            setProfile(data);
            setIsAdmin(data.role === 'admin');
        }
    };

    const value = {
        user,
        profile,
        isAdmin,
        loading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        sendPhoneOtp,
        verifyPhoneOtp,
        updateProfile,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
