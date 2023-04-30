export function validateForm(name:string="", formValidation:any=null, value:string="", label:string=""){
    
    if(!formValidation || !name) return "";

    let errorMessage = null;

    if(formValidation['required']){
        if(!value){
            errorMessage = `The ${label||name} is required`;
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
            errorMessage = `${label||name} should have minimum of ${formValidation['min_length']} characters`;
            return errorMessage;
        }
    }

    if(formValidation['max_length']){
        if (value.length>formValidation['max_length']){
            errorMessage = `${label||name} exceeds maximum character limit of ${formValidation['max_length']}`;
            return errorMessage;
        }
    }

    return errorMessage;
}