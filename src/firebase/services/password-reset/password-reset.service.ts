import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../setup";
import { popupModel } from "../../../common/constants/models";


export function sendPasswordResetEmailLink(email: string,handleError: Function) {
  if(!email){
    popupModel['title'] = 'Email required';
    popupModel['message'] = 'Email address is required';
    popupModel['color'] = 'warning';
    handleError(JSON.parse(JSON.stringify(popupModel)));
  }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        popupModel['title'] = 'Password reset';
        popupModel['message'] = 'Password reset mail has send';
        popupModel['color'] = 'info';
        handleError(JSON.parse(JSON.stringify(popupModel)));
      })
      .catch((error) => {
        console.log(error.code);
        if(error.code === 'auth/too-many-requests'){
            popupModel['title'] = 'Too many requests';
            popupModel['message'] = 'Please try login after some times';
            popupModel['color'] = 'error';
            handleError(JSON.parse(JSON.stringify(popupModel)));
        }
        if(error.code === 'auth/user-not-found'){
            popupModel['title'] = 'No user found';
            popupModel['message'] = 'Invalid email address';
            popupModel['color'] = 'error';
            handleError(JSON.parse(JSON.stringify(popupModel)));
        }
      });
}
