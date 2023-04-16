
import { IForm } from "../../common/form/interfaces";
import Form from "../../common/form/container/form";
export default function SignUpPageContainer() {

    const signUpForm: IForm = {
        heading: 'Sign Up',
        subHeading: `Sign Up if you don't have an account`,
        fields: [
            {
                name: 'email',
                id: 'email',
                type: 'email',
                placeholder: 'Email',
                required: true
            },
            {
                name: 'name',
                id: 'name',
                type: 'text',
                placeholder: 'Full Name',
                required: true
            },
            {
                name: 'password',
                id: 'password',
                type: 'password',
                placeholder: 'Password',
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
                    name: 'Sign Up',
                    backgroundColor: '#6771df',
                    backgroundColorHover: '#000291'
                }
            ],
            spacing: 10
        }
    };

    return (
        <Form {...signUpForm} />
    );
}