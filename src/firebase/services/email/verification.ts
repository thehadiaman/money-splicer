import { User, sendEmailVerification } from "firebase/auth";

export function sendVerificationMail(currentUser: User){
    sendEmailVerification(currentUser);
}