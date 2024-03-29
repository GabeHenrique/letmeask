import React, {createContext, ReactNode, useEffect, useState} from "react";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

type User = {
    id: string;
    name: string;
    avatar: string
}
type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType)

type AuthContextProviderProps = {
    children: ReactNode
}

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged(user => {
            if (user) {
                const {displayName, photoURL, uid} = user
                if (!displayName || !photoURL) {
                    throw new Error("Missing information from Google Account")
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })
        return () => {
            unsubscribe();
        }
    }, [])

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);

        if (result.user) {
            const {displayName, photoURL, uid} = result.user
            if (!displayName || !photoURL) {
                throw new Error("Missing information from Google Account")
            }
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }


    return (
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>

    );
}