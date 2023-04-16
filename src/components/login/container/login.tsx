import { IForm } from "../../common/form/interfaces";
import Form from "../../common/form/container/form";
export default function LoginPageContainer() {

    const loginForm: IForm = {
        heading: 'Login',
        subHeading: 'Login to go further',
        fields: [
            {
                name: 'email',
                id: 'email',
                type: 'email',
                placeholder: 'Email',
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
                    name: 'Login',
                    backgroundColor: '#6771df',
                    backgroundColorHover: '#000291'
                }
            ],
            spacing: 10
        }
    };

    return (
        <Form {...loginForm} />
    );
}