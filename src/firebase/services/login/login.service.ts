/**
 * Importing firebase auth and firebase app
 */
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ILogin } from "./login.interfaces";
import { auth } from "../../setup";
import { popupModel } from "../../../common/constants/models";
import { clone } from "../../../common/functions/cloneData";

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
                    popupModel['title'] = 'Login Successful';
                    popupModel['color'] = 'success';
                    if(cred.user.emailVerified)
                        popupModel['message'] = 'User logged in';
                    else
                        popupModel['message'] = 'Please verify the email';

                    handleError(clone(popupModel));
                }
            )
            .catch(
                (error)=>{
                    if(error.code === 'auth/user-not-found'){
                        popupModel['title'] = 'Login Failed';
                        popupModel['message'] = 'Invalid email address';
                        popupModel['color'] = 'error';
                        handleError(clone(popupModel));
                    }
                    if(error.code === 'auth/wrong-password'){
                        popupModel['title'] = 'Login Failed';
                        popupModel['message'] = 'Invalid Password';
                        popupModel['color'] = 'error';
                        handleError(clone(popupModel));
                    }
                    if(error.code === 'auth/too-many-requests'){
                        popupModel['title'] = 'Too many requests';
                        popupModel['message'] = 'Please try login after some times';
                        popupModel['color'] = 'error';
                        handleError(clone(popupModel));
                    }
                }
            )
    else{
        popupModel['message'] = 'Email and Password required';
        popupModel['color'] = 'error';
        handleError(clone(popupModel));
    }
}

export function signOutUser(){
    signOut(auth);
}