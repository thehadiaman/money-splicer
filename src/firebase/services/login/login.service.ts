/**
 * Importing firebase auth and firebase app
 */
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ILogin } from "./login.interfaces";
import { auth } from "../../setup";
import { popupModel } from "../../../common/constants/models";

export async function getLoggedInUser(){
    return auth.currentUser;
}

export function userLogin(loginData: ILogin, setCurrentUser: Function, handleError: Function){
    const email = loginData['email'];
    const password = loginData['password'];
    if(email && password)
        signInWithEmailAndPassword(auth, email, password)
            .then(
                cred=>{
                    setCurrentUser(cred.user);
                }
            )
            .catch(
                (error)=>{
                    if(error.code === 'auth/user-not-found'){
                        popupModel['title'] = 'Login Failed';
                        popupModel['message'] = 'Invalid email address';
                        popupModel['color'] = 'error';
                        handleError(JSON.parse(JSON.stringify(popupModel)));
                    }
                    if(error.code === 'auth/wrong-password'){
                        popupModel['title'] = 'Login Failed';
                        popupModel['message'] = 'Invalid Password';
                        popupModel['color'] = 'error';
                        handleError(JSON.parse(JSON.stringify(popupModel)));
                    }
                    if(error.code === 'auth/too-many-requests'){
                        popupModel['title'] = 'Too many requests';
                        popupModel['message'] = 'Please try login after some times';
                        popupModel['color'] = 'error';
                        handleError(JSON.parse(JSON.stringify(popupModel)));
                    }
                }
            )
    else{
        popupModel['message'] = 'Email and Password required';
        popupModel['color'] = 'error';
        handleError(JSON.parse(JSON.stringify(popupModel)));
    }
}

export function signOutUser(){
    signOut(auth);
}