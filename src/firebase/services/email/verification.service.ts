import { User, sendEmailVerification } from "firebase/auth";
import { popupModel } from "../../../common/constants/models";
import { clone } from "../../../common/functions/cloneData";

export function sendVerificationMail(currentUser: User, handleError: Function){
    sendEmailVerification(currentUser)
        .then(
            ()=>{
                popupModel['title'] = 'Email send';
                popupModel['message'] = 'Email verification mail send successfully';
                popupModel['color'] = 'info';
                handleError(clone(popupModel));
            }
        )
        .catch(
            error=>{
                if(error.code === 'auth/too-many-requests'){
                    popupModel['title'] = 'Too many mail';
                    popupModel['message'] = 'Please try login after some times';
                    popupModel['color'] = 'error';
                    handleError(clone(popupModel));
                }
            }
        );
}