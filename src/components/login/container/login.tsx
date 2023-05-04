import { IForm, IFormField } from "../../common/form/interfaces";
import Form from "../../common/form/container/form";
import { getFormData } from "../../../common/functions/getFormData";
import { useState } from "react";
import { userLogin } from "../../../firebase/services/login/login.service";

export default function LoginPageContainer(props: any) {

    const inputFields: Array<IFormField> = [
        {
            name: 'email',
            id: 'email',
            type: 'email',
            placeholder: 'Email*',
            required: true,
            value: '',
            validation:{
               email: true,
               required: true 
            }
        },
        {
            name: 'password',
            id: 'password',
            type: 'password',
            placeholder: 'Password*',
            required: true,
            value: '',
            validation:{
               required: true,
               min_length: 6
            }
        }
    ];
    const [formFields, setFormFields] = useState(inputFields)

    const loginForm: IForm = {
        heading: 'Login',
        subHeading: 'Login to go further',
        fields: formFields,
        buttons: {
            buttons: [
                {
                    name: 'Clear',
                    backgroundColor: '#e63f3f',
                    onClick: resetForm,
                    type: 'reset'
                },
                {
                    name: 'Login',
                    backgroundColor: '#6771df',
                    backgroundColorHover: '#000291',
                    type: 'submit'
                }
            ],
            spacing: 10
        },
        valueSetter: setFormFields,
        onSubmit: login
    };

    function login(): void{
        let formData = getFormData(formFields);
        userLogin(formData, props.setCurrentUser, props.handleError)
    }

    function resetForm(): void{
        setFormFields(inputFields);
    }

    return (
        <Form {...loginForm} />
    );
}