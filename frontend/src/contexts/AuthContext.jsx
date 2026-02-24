'use client'

import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setLoading(true);
            if (firebaseUser) {
                setUser(firebaseUser);

                // Fetch extended profile from Firestore
                if (db) {
                    const userRef = doc(db, 'users', firebaseUser.uid);
                    const userDoc = await getDoc(userRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setProfile(userData);
                        setIsAdmin(userData.role === 'admin');
                    } else {
                        // If profile doesn't exist (e.g., first Google login), create it
                        const newProfile = {
                            name: firebaseUser.displayName || 'User',
                            email: firebaseUser.email,
                            role: 'customer',
                            createdAt: serverTimestamp(),
                        };
                        await setDoc(userRef, newProfile);
                        setProfile(newProfile);
                        setIsAdmin(false);
                    }
                }
            } else {
                setUser(null);
                setProfile(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const registerWithEmail = async (name, email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Create profile in Firestore
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
            name: name,
            email: email,
            role: 'customer',
            createdAt: serverTimestamp()
        });

        return userCredential;
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const logout = () => {
        return signOut(auth);
    };

    const value = {
        user,
        profile,
        isAdmin,
        loading,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
