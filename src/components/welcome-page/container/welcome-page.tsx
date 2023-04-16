import Tabs from "../../common/tab/container/tabs";
import { ITabs } from "../../common/tab/interfaces";
import ForgotPassword from "../../forgot-password";
import LoginPage from "../../login";
import SignUpPage from "../../signup";

export default function WelcomePageContainer() {

    const tabsData: ITabs = ({
        tabs: [
                {
                    name: 'Login',
                    component: <LoginPage/>
                },
                {
                    name: 'Sign Up',
                    component: <SignUpPage />
                },
                {
                    name: 'Password',
                    component: <ForgotPassword />
                }
            ]
        });

return (
    <section className={"container"}>
        <div className="common-form">
            <Tabs {...tabsData} />
        </div>
    </section>
);
}