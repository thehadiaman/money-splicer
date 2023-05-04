import { IValidate } from "../../components/common/form/interfaces";

export function validateForm(name:string="", formValidation:IValidate|undefined, value:string=""){
    if(!formValidation || !name) return "";

    let errorMessage = null;
    let isNumber = typeof(Number(value)) === "number";

    if(formValidation['required']){
        if(!value){
            errorMessage = `The ${formValidation['label']||name} is required`;
            return errorMessage;
        }
    }

    if(formValidation['email']){
        const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegexp.test(value)){
            errorMessage = "Invalid email format";
            return errorMessage;
        }
    }

    if(formValidation['min_length']){
        if (value.length<formValidation['min_length']){
            errorMessage = `${formValidation['label']||name} should have minimum of ${formValidation['min_length']} characters`;
            return errorMessage;
        }
    }

    if(formValidation['max_length']){
        if (value.length>formValidation['max_length']){
            errorMessage = `${formValidation['label']||name} exceeds maximum character limit of ${formValidation['max_length']}`;
            return errorMessage;
        }
    }

    if(formValidation['min'] && isNumber){
        if (Number(value)<Number(formValidation['min'])){
            errorMessage = `${formValidation['label']||name} should be greater than ${value}`;
            return errorMessage;
        }
    }

    if(formValidation['max'] && isNumber){
        if (Number(value)>Number(formValidation['max'])){
            errorMessage = `${formValidation['label']||name} should be less than ${formValidation['max']}`;
            return errorMessage;
        }
    }

    return errorMessage;
}