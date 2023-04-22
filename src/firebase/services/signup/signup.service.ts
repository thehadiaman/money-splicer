/**
 * Importing firebase auth and firebase app
 */
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"
import { auth, database } from "../../setup"
import { ISignUp } from "./signup.interfaces";
import { ref, set } from "firebase/database";
import { USER_COLLECTION } from "../../../common/constants/collections";

export async function signUpService(signUpData: ISignUp, setCurrentUser: Function){
  const cred = await createUserWithEmailAndPassword(auth, signUpData['email'], signUpData['password']);
  
  
  await set(ref(database, `${USER_COLLECTION}/` + cred.user.uid), {
      name: signUpData.name
    }).then(
      ()=>{
        sendEmailVerification(cred.user);
        setCurrentUser(cred.user);
      }
    );
  
}