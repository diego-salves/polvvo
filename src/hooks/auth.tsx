import React, { 
    useContext,
    createContext,
    ReactNode,
    useState,
    useEffect,
} from "react";
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps{
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string; 
    photo?: string;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signOut(): Promise<void>;
    userStorageLoading: boolean;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    };
    type: string,
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps ){
    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);
    const userStorageKey='@polvvo:user'
    
    async function signInWithGoogle() {
        try{
            const CLIENT_ID = '810929229593-ohb7t3iig0eedus5b1ihb8suok0akbap.apps.googleusercontent.com';
            const REDIRECT_URI = 'https://auth.expo.io/@diego108/polvvo';
            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params} = await AuthSession
            .startAsync({ authUrl }) as AuthorizationResponse;

            if(type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`); 
                const userInfo = await response.json();
                setUser({
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                });
            }

        } catch (error) {
            throw new Error(error as string);
        }

    }

    async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(userStorageKey);
    }

    useEffect(() => {
        async function loadUserStorageData(){
            const userStoraged = await AsyncStorage.getItem(userStorageKey);

            if(userStoraged){
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
            }
            setUserStorageLoading(false);
        }

        loadUserStorageData();
    },[]);

    return(
    <AuthContext.Provider value={{ 
        user,
        signInWithGoogle,
        signOut,
        userStorageLoading,
    }}>
      { children }
    </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }