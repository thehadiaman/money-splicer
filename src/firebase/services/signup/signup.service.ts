/**
 * Importing firebase auth and firebase app
 */
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth, database } from "../../setup"
import { ISignUp } from "./signup.interfaces";
import { ref, set } from "firebase/database";

export async function signUpService(signUpData: ISignUp, setCurrentUser: Function){
  const cred = await createUserWithEmailAndPassword(auth, signUpData['email'], signUpData['password']);
  
  
  await set(ref(database, 'users/' + cred.user.uid), {
      name: signUpData.name
    }).then(
      ()=>{
        sendEmailVerification(cred.user);
        setCurrentUser(cred.user);
      }
    );
  
}