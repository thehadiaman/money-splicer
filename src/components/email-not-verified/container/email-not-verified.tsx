import { sendVerificationMail } from "../../../firebase/services/email/verification";

export default function EmailNotVerifiedContainer(props: any) {


    const sendEmailVerificationLink = () => {
        sendVerificationMail(props.currentUser)
    }

    return (
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
    );
}