/**
 * Importing firebase auth and firebase app
 */
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth, database } from "../../setup"
import { ISignUp } from "./signup.interfaces";
import { ref, set } from "firebase/database";
import { USER_COLLECTION } from "../../../common/constants/collections";
import { popupModel } from "../../../common/constants/models";

export async function signUpService(signUpData: ISignUp, setCurrentUser: Function, handleError: Function){
  if(!signUpData.name || signUpData.name.length < 3){
    popupModel['title'] = 'Invalid user name';
    popupModel['message'] = !signUpData.name?'Username is required':'Minimum of 3 characters required';
    popupModel['color'] = 'warning';
    handleError(JSON.parse(JSON.stringify(popupModel)));
    return;
  }
  createUserWithEmailAndPassword(auth, signUpData['email'], signUpData['password'])
  .then(
    (cred)=>{
      set(ref(database, `${USER_COLLECTION}/` + cred.user.uid), {
          name: signUpData.name
        }).then(
          ()=>{
            sendEmailVerification(cred.user);
            setCurrentUser(cred.user);
            popupModel['title'] = 'User created';
            popupModel['message'] = `Hi ${signUpData.name}, Please verify your email`;
            popupModel['color'] = 'success';
            handleError(JSON.parse(JSON.stringify(popupModel)));
          }
        );
    }
  ).catch(
    (error)=>{
      if(error.code === 'auth/email-already-in-use'){
        popupModel['title'] = 'Email already used';
        popupModel['message'] = 'Provided email is already used';
        popupModel['color'] = 'error';
        handleError(JSON.parse(JSON.stringify(popupModel)));
      }
      console.log(error.code)
      if(error.code === 'auth/weak-password'){
        popupModel['title'] = 'Invalid Password';
        popupModel['message'] = 'Password is too weak';
        popupModel['color'] = 'warning';
        handleError(JSON.parse(JSON.stringify(popupModel)));
      }
    }
  )
  

  
}