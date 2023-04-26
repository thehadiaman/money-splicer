/**
 * Importing firebase auth and firebase app
 */
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ILogin } from "./login.interfaces";
import { auth } from "../../setup";

export async function getLoggedInUser(){
    return auth.currentUser;
}

export function userLogin(loginData: ILogin, setCurrentUser: Function){
    const email = loginData['email'];
    const password = loginData['password'];
    if(email && password)
        signInWithEmailAndPassword(auth, email, password)
            .then(
                cred=>{
                    setCurrentUser(cred.user);
                }
            )
}

export function signOutUser(){
    signOut(auth);
}