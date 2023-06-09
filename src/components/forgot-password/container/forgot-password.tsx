
import { IForm, IFormField } from "../../common/form/interfaces";
import Form from "../../common/form/container/form";
import { getFormData } from "../../../common/functions/getFormData";
import { useState } from "react";
import { sendPasswordResetEmailLink } from "../../../firebase/services/password-reset/password-reset.service";

export default function ForgotPasswordContainer(props: any) {

    const inputFields: Array<IFormField> = [
        {
            name: 'email',
            id: 'email',
            type: 'email',
            placeholder: 'Email*',
            required: true,
            value: '',
            validation: {
                required: true,
                email: true
            }
        }
    ];

    const [formFields, setFormFields] = useState(inputFields)

    const forgotPasswordForm: IForm = {
        heading: 'Sign Up',
        subHeading: `Sign Up if you don't have an account`,
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
                    name: 'Submit',
                    backgroundColor: '#6771df',
                    backgroundColorHover: '#000291',
                    onClick: resetPassword,
                    type: 'submit'
                }],
            spacing: 10
        },
        valueSetter: setFormFields
    };

    function resetPassword(): void {
        let formData = getFormData(formFields);
        sendPasswordResetEmailLink(formData['email'], props.handleError)
    }

    function resetForm(): void {
        setFormFields(inputFields);
    }

    return (
        <Form {...forgotPasswordForm} />
    );
}