import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { useState, useEffect, useContext} from 'react';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [loading, isLoading] = useState(true);
    const [user, setUser]= useState(null);
    const  navi = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user)=>{
            setUser(user);
            isLoading(false);
            if(user) navi('/chats');
        })
    },[user, navi]);
    const value ={user};
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

    
