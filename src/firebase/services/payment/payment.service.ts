import { onValue, ref, set, update } from "firebase/database";
import { PAYMENT_COLLECTION, USER_COLLECTION } from "../../../common/constants/collections";
import { database } from "../../setup";
import { generateRandomNumber } from "../../../common/functions/generateRandomNumber";
import { popupModel } from "../../../common/constants/models";
import { clone } from "../../../common/functions/cloneData";

export async function createPaymentService({paymentData, handleError, uid, handleModal}: any){

    if(!paymentData.payment || paymentData.payment<1){
            popupModel['title'] = 'Payment required';
            popupModel['message'] = 'Payment should be greater than zero';
            popupModel['color'] = 'warning';
            handleError(clone(popupModel));
            return;
    }

    /**
     * Creating a random number with 20 digits
     * It have ninety quintillion (9*(10^90)) possibilities to get the same number.
     */
    let paymentId = uid + String(generateRandomNumber(20));
    set(ref(database, `${PAYMENT_COLLECTION}/${paymentId}`), paymentData).then(
        ()=>{
            popupModel['title'] = 'Payment created';
            popupModel['message'] = 'New payment created';
            popupModel['color'] = 'success';
            handleError(clone(popupModel));
            handleModal()
        }
    )
  
}

export function getPaymentService({uid, setPayment, roomId}: any){

    const payment = ref(database, `${PAYMENT_COLLECTION}`);
    
    onValue(payment, (snapshot) => {
        let paymentVal: any[] = snapshot.val();
        paymentVal = Object.values(paymentVal|| {}).filter(
            (element)=>{
                return roomId===element['roomId']
            }
        ).map(
            (element, index)=>{
                element['mainPaymentId'] = Object.keys(paymentVal)[index];
                return element;
            }
        );
        const user = ref(database, `${USER_COLLECTION}`);
        onValue(user, (userSnapShot)=>{
            let paymentValueDetails = clone(paymentVal)
            let userVal = userSnapShot.val();
            for (let index = 0; index < paymentValueDetails.length; index++) {
                const paymentData = paymentValueDetails[index];
                let arrPayments: Array<any> = [];
                Object.keys(paymentData.payments).forEach((userId, index) => {
                    let arrChecked = paymentData.checked?paymentData.checked:[];
                    let checked = arrChecked.includes(userId) || false;
                    arrPayments.push({
                        user: userVal[userId],
                        uid: userId,
                        payment: Object.values(paymentData.payments)[index],
                        paymentId: Object.keys(paymentData.payments)[index],
                        checked,
                        roomId
                    });
                });
                paymentData.payments = arrPayments;
            };
            setPayment(clone(paymentValueDetails))
        });
    });
  
}


export function checkPaymentService(uid: string, roomId: string, paymentId: string){
    const payment = ref(database, `${PAYMENT_COLLECTION}/${paymentId}/checked`);
    let arrCheck: Array<any> = [];
    onValue(payment, snapshot=>{
        arrCheck = snapshot.val()?Object.values(snapshot.val()):[];
        if(snapshot.val() && Object.values(snapshot.val()).includes(uid)){
            arrCheck = Object.values(snapshot.val()).filter(
                    userId=>userId!==uid);
        }else{
            arrCheck.push(uid);
        }
    });
    set(payment, arrCheck);
}

export async function updatePaymentService({paymentData, mainPaymentId, handleError, handleModal}: any){

    if(!paymentData.payment || paymentData.payment<1){
            popupModel['title'] = 'Payment required';
            popupModel['message'] = 'Payment should be greater than zero';
            popupModel['color'] = 'warning';
            handleError(clone(popupModel));
            return;
    }

    set(ref(database, `${PAYMENT_COLLECTION}/${mainPaymentId}`), paymentData).then(
        ()=>{
            popupModel['title'] = 'Payment updated';
            popupModel['message'] = 'New payment updated';
            popupModel['color'] = 'success';
            handleError(clone(popupModel));
            handleModal()
        }
    )
  
}

export async function deletePaymentService({mainPaymentId, handleError, handleModal}: any){

    set(ref(database, `${PAYMENT_COLLECTION}/${mainPaymentId}`), {}).then(
        ()=>{
            popupModel['title'] = 'Payment deleted';
            popupModel['message'] = 'The payment deleted';
            popupModel['color'] = 'error';
            handleError(clone(popupModel));
            handleModal()
        }
    )
  
}