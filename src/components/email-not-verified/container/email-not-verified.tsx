import { sendVerificationMail } from "../../../firebase/services/email/verification.service";
import { signOutUser } from "../../../firebase/services/login/login.service";
import TopNavigation from "../../common/top-navigation";

export default function EmailNotVerifiedContainer(props: any) {


    const sendEmailVerificationLink = () => {
        sendVerificationMail(props.currentUser, props.handleError)
    }

    const navMenu = [
        {
            type: 'link',
            displayName: 'Verification',
            status: 'active',
            link: '/'
        },
        {
            btnName: props.currentUserDetails?.['name'] || '',
            type: 'dropdown',
            items: [
                {
                    displayName: 'Logout',
                    onClick: signOutUser
                }
            ],
            position: 'right',

        }
    ];

    return (
        <div>
            <TopNavigation navMenu={navMenu}/>
            <section className={"container"}>
                <div className="common-form">
                    <h1 className={'center-text'}>Please verify the email</h1>
                    <section key={`tabs-div`} className={"btn-group"} style={{ width: '100%' }}>
                        <button
                            onClick={() => sendEmailVerificationLink()}
                            className={"full-width"}
                        >Send Email Verification Link</button>
                    </section>
                </div>
            </section>
        </div>
    );
}