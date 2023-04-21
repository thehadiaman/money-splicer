
import { IForm, IFormField } from "../../common/form/interfaces";
import Form from "../../common/form/container/form";
import { getFormData } from "../../../common/functions/getFormData";
import { useState } from "react";
import { signUpService } from "../../../firebase/services/signup/signup.service";
// import { signOutUser } from "../../../firebase/services/login/login.service";

export default function SignUpPageContainer(props:any) {

    const inputFields: Array<IFormField> = [
        {
            name: 'email',
            id: 'email',
            type: 'email',
            placeholder: 'Email',
            required: true,
            value: ''
        },
        {
            name: 'name',
            id: 'name',
            type: 'text',
            placeholder: 'Full Name',
            required: true,
            value: ''
        },
        {
            name: 'password',
            id: 'password',
            type: 'password',
            placeholder: 'Password',
            required: true,
            value: ''
        }
    ];

    const [formFields, setFormFields] = useState(inputFields)

    const signUpForm: IForm = {
        heading: 'Sign Up',
        subHeading: `Sign Up if you don't have an account`,
        fields: formFields,
        buttons: {
            buttons: [
                {
                    name: 'Clear',
                    backgroundColor: '#e63f3f',
                    onClick: resetForm
                },
                {
                    name: 'Sign Up',
                    backgroundColor: '#6771df',
                    backgroundColorHover: '#000291',
                    onClick: signUpUser
                }
            ],
            spacing: 10
        },
        valueSetter: setFormFields
    };

    function signUpUser(): void{
        let formData = getFormData(formFields);
        signUpService(formData, props.setCurrentUser);
        props.setCurrentUser()
    }

    function resetForm(): void{
        setFormFields(inputFields);
        // signOutUser()
    }

    return (
        <Form {...signUpForm} />
    );
}