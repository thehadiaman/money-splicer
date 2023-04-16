import { IForm } from "../../common/form/interfaces";
import Form from "../../common/form/container/form";
export default function ForgotPasswordContainer() {

    const forgotPasswordForm: IForm = {
        heading: 'Forgot Password',
        subHeading: `Reset password with email and OTP`,
        fields: [
            {
                name: 'email',
                id: 'email',
                type: 'email',
                placeholder: 'Email',
                required: true
            }
        ],
        buttons: {
            buttons: [
                {
                    name: 'Clear',
                    backgroundColor: '#e63f3f'
                },
                {
                    name: 'Submit',
                    backgroundColor: '#6771df',
                    backgroundColorHover: '#000291'
                }],
            spacing: 10
        }
    };

    return (
        <Form {...forgotPasswordForm} />
    );
}