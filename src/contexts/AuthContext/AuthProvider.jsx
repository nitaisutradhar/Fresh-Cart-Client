import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import useAxios from '../../hooks/useAxios'

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios()

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = profileInfo => {
        return updateProfile(auth.currentUser, profileInfo);
    }

    const logOut = () => {
        setLoading(true);
        localStorage.removeItem('token') // remove token when logout
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // provide email to the server and get token from server
            if(currentUser?.email){
                axiosInstance.post('/jwt', {
                    email: currentUser?.email,
                })
                .then(res => {
                    localStorage.setItem('token', res.data.token) // set token to the localstorage
                })
            }
            else{
                localStorage.removeItem('token') // if user is not found then remove token
            }
            setLoading(false);
        });

        return () => {
            unSubscribe();
        }
    }, [axiosInstance])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        updateUserProfile,
        logOut
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;