import { useEffect, useState } from "react";
import { getFormData } from "../../../common/functions/getFormData";
import { IButton, IForm, IFormField } from "../../common/form/interfaces";
import Form from "../../common/form";
import { clone } from "../../../common/functions/cloneData";
import { createPaymentService, deletePaymentService, updatePaymentService } from "../../../firebase/services/payment/payment.service";
import Modal from "../../common/modal";
import ButtonGroup from "../../common/button";

export default function PaymentContainer(props: any) {

    let inputFields: Array<IFormField> = [
        {
            name: 'payment',
            id: 'payment',
            type: 'number',
            placeholder: 'Payment Amount*',
            required: true,
            value: '',
            onValueChange: amountChanged,
            validation:{
               required: true,
               min: 1,
               label: 'Payment amount'
            }
        },
        {
            name: 'description',
            id: 'description',
            type: 'textarea',
            placeholder: 'Description',
            required: true,
            value: '',
            validation:{
               max_length: 100
            }
        },
    ];
    const [formFields, setFormFields] = useState(inputFields);

    let buttons: IButton = {
        spacing: 0,
        buttons: [
        {
            name: props.paymentUpdate.payment?'Update':'Add',
            backgroundColor: '#6771df',
            type: 'submit'
        }
    ]};
    let deleteButtons: IButton = {
        spacing: 0,
        buttons: [
        {
            name: 'Delete',
            backgroundColor: '#6771df',
            type: 'submit',
            onClick: onDelete
        }
    ]};
    function onDelete(){
        deletePaymentService({
            handleModal,
            handleError: props.handleError,
            mainPaymentId
        })
    }
    function handleModal(){
        handlePaymentDeleteModal();
        props.handleModal()
    }
    const [formButtons, setFormButtons] = useState(buttons);

    const [mainPaymentId, setMainPaymentId] = useState('')

    const [showPaymentDeleteModal, setShowPaymentDeleteModal] = useState(false)

    function handlePaymentDeleteModal() {
        setShowPaymentDeleteModal(!showPaymentDeleteModal);
    }



    useEffect(()=>{

        let inputField: IFormField = {
            name: '',
            id: '',
            type: 'number',
            placeholder: '',
            value: ''
        };

        const arrRoomMateAmounts: any[] = [];
        props.roomMates.forEach((mate: any) => {
            let newField: IFormField = clone(inputField);
            newField['id'] = mate.uid;
            newField['name'] = mate.uid;
            newField['placeholder'] = mate.name;
            newField['label'] = mate.name;
            newField['onValueChange'] = adjustAmountChanged;
            arrRoomMateAmounts.push(newField);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
        inputFields = [inputFields[0], ...arrRoomMateAmounts, inputFields[1]];
        setFormFields(inputFields);

        if(props.paymentUpdate.payment){
            setMainPaymentId(props.paymentUpdate.mainPaymentId)
            formButtons.buttons.unshift(
                {
                    name: 'Delete',
                    backgroundColor: '#e63f3f',
                    type: 'button',
                    onClick: handlePaymentDeleteModal
                }
            );
            formButtons.spacing = 10;
            setFormButtons(formButtons);

            inputFields[0]['value'] = props.paymentUpdate['payment'];
            inputFields[inputFields.length-1]['value'] = props.paymentUpdate['description'];

            props.paymentUpdate.payments.forEach((paymentData: any) => {
                inputFields.map(
                    (field: any)=>{
                        if(paymentData['uid'] === field['name']){
                            field['value'] = paymentData['payment'];
                            field['disabled'] = paymentData['checked'];
                        }
                        else if(field['name']==='payment'){
                            field['value'] = props.paymentUpdate['payment']
                        }
                        else if(field['name']==='description'){
                            field['value'] = props.paymentUpdate['description']
                        }
                        return field;
                    }
                );
            });

            setFormFields(inputFields);
        }

    }, [props.roomMate, props.roomMates]);

    const paymentForm: IForm = {
        heading: props.paymentUpdate.payment?'Update Payment':'Add Payment',
        fields: formFields,
        buttons: formButtons,
        valueSetter: setFormFields,
        onSubmit: createOrUpdatePayment
    };

    function amountChanged(event: any, onValueChange: Function, formFields: any){
        onValueChange(event);
        if(Number(formFields[0].value || 0) > 0){
            let totalAmount = Number(formFields[0].value);
            let amountSplits = formFields.filter((field: any) => !['payment', 'description'].includes(field.name));
            let objAmountSplits = getFormData(amountSplits);
            let arrUid = Object.keys(objAmountSplits);
            let arrDisabledFieldsName: Array<string> = [];
            let disabledTotal = 0;
            let arrDisabledFields = formFields.filter(
                (field:any)=>{
                    if(field['disabled']){
                        disabledTotal += Number(field['value']);
                        arrDisabledFieldsName.push(field['name']);
                    }
                    return field['disabled'];
                }
            );

            arrUid.forEach((uid: string) => {
                if(!arrDisabledFieldsName.includes(uid))
                    objAmountSplits[uid] = (totalAmount-disabledTotal)/(arrUid.length-arrDisabledFields.length);
            });

            formFields.forEach((field: any) => {
                if(objAmountSplits[field.name]){
                    field.value = objAmountSplits[field.name];
                }
            });
        }
    }

    function adjustAmountChanged(event: any, onValueChange: Function, formFields: Array<IFormField>){
        onValueChange(event);
        
        let calculatedTotalAmount = 0;

        formFields.forEach(field => {
            if(!['payment', 'description'].includes(field.name))
                calculatedTotalAmount += Number(field['value']);
        });

        let totalAmount = formFields.find(
            field=>field['name'] === 'payment'
        );

        if(totalAmount?.value){
            if(Number(totalAmount.value) !== Number(calculatedTotalAmount)){
                let amountDifference = Number(totalAmount.value) - Number(calculatedTotalAmount);
                totalAmount['value'] = String(Number(totalAmount['value']) - amountDifference);
            }
        }else if(totalAmount){
            totalAmount['value'] = String(calculatedTotalAmount);
        }
    }

    function createOrUpdatePayment(): void{
        let formData = {...getFormData(formFields)};
        let payments = clone(formData);
        delete payments['payment'];
        delete payments['description'];
        let createPaymentData = {
            payment: formData['payment'],
            description: formData['description'],
            payments,
            roomId: props.roomId
        };
        if(props.paymentUpdate.payment){
            updatePaymentService({
                paymentData: createPaymentData,
                uid: props.currentUser.uid,
                handleError: props.handleError,
                handleModal: props.handleModal,
                mainPaymentId: props.paymentUpdate.mainPaymentId
            });
            return;
        }
        createPaymentService({
            paymentData: createPaymentData,
            uid: props.currentUser.uid,
            handleError: props.handleError,
            handleModal: props.handleModal
        });
    }


    return (
        <div>
            {
                showPaymentDeleteModal ?
                    <Modal {...{ handleModal: props.handleModal, component: <div>
                        <h2>If you delete the payment the data will be gone !.</h2>
                        <ButtonGroup {...deleteButtons} />
                    </div> }} />
                    :
                    ""
            }
            <Form {...paymentForm} />
        </div>
    );
}
