import { IForm, IFormField } from "../../common/form/interfaces";
import Form from "../../common/form/container/form";
import { getFormData } from "../../../common/functions/getFormData";
import { useState } from "react";

export default function LoginPageContainer() {

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
            name: 'password',
            id: 'password',
            type: 'password',
            placeholder: 'Password',
            required: true,
            value: ''
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
                    onClick: resetForm
                },
                {
                    name: 'Login',
                    backgroundColor: '#6771df',
                    backgroundColorHover: '#000291',
                    onClick: login
                }
            ],
            spacing: 10
        },
        valueSetter: setFormFields
    };

    function login(): void{
        let formData = getFormData(formFields);
        console.log(formData);
    }

    function resetForm(): void{
        setFormFields(inputFields);
    }

    return (
        <Form {...loginForm} />
    );
}