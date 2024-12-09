import React, {createContext, useState, useEffect, useContext} from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth, getReactNativePersistence, initializeAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from '@firebase/auth';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from '@firebase/app';
import {
    FIREBASE_API_KEY,
    FIREBASE_APP_ID,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_MEASUREMENT_ID,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET
} from "@env";

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(SecureStore)
});
export const AuthContext = createContext();

// export const useAuthContext = () => {
//     return useContext(AuthContext);
// };

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, [auth]);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleAuthentication = async (email, password, navigation) => {
        setErrorMessage('');
        try {
            if (user) {
                //setUser(null);
                await signOut(auth);
                await SecureStore.deleteItemAsync('user');
                console.log('User logged out successfully!');
            } else {
                if (isLogin) {
                    await signInWithEmailAndPassword(auth, email, password);
                    console.log('User signed in successfully!');
                    navigation.navigate('Main');
                } else {
                    await createUserWithEmailAndPassword(auth, email, password);
                    console.log('User created successfully!');
                }
            }
        } catch (error) {
            switch (error.code){
                case 'auth/invalid-email':
                    setErrorMessage('Invalid email format.');
                    break;
                case 'auth/user-not-found':
                    setErrorMessage('User not found. Please register.');
                    break;
                case 'auth/wrong-password':
                    setErrorMessage('Incorrect password. Please try again.');
                    break;
                case 'auth/email-already-in-use':
                    setErrorMessage('This email is already in use. Please log in.');
                    break;
                case 'auth/invalid-credential':
                    setErrorMessage('Invalid cridencial.');
                    break;
                default:
                    setErrorMessage('Authentication error: ' + error.message);
                    console.log(error.code)
            }
        }
    };
    return (
        <AuthContext.Provider value={{ user, setUser, handleAuthentication, isLogin, setIsLogin, errorMessage }}>
            {children}
        </AuthContext.Provider>
    );
};
