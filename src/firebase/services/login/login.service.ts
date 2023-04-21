/**
 * Importing firebase auth and firebase app
 */
import { User, getAuth, signOut } from "firebase/auth";
import { ILogin } from "./login.interfaces";
import { fireApp } from "../../setup";

export async function getLoggedInUser(){
    const auth = await getAuth(fireApp);
    return auth.currentUser;
}

// export function login(loginData: ILogin){
//     if(!auth.currentUser){
           
//     }
//     else if(auth.currentUser && !auth.currentUser.emailVerified){

//     }
//     else{

//     }
// }

// export function signOutUser(){
//     signOut(auth).then(() => {
//         // Sign-out successful.
//       }).catch((error) => {
//         // An error happened.
//       });
// }