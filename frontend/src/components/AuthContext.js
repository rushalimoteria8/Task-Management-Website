import React, { useState, useContext} from 'react';

const AuthContext = React.createContext();

export function useAuth(){
    useContext(AuthContext);
}

export function AuthProvider(props){
    const [authUser, setAuthUser] = useState(null);
    const [loggedIn, setIsLoggedIn] = useState(false);

    const value = {
        authUser,
        setAuthUser,
        loggedIn,
        setIsLoggedIn
    };

    return (
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    );
}