import { useState } from "react";
import { signOutUser } from "../../../firebase/services/login/login.service";
import TopNavigation from "../../common/top-navigation";
import Room from "../../room";
import Modal from "../../common/modal";
import RoomsList from "../../rooms-list";

export default function LoggedInPageContainer(props: any) {

    const navMenu = [
        {
            type: 'link',
            displayName: 'Home Page',
            status: 'active',
            link: '/'
        },
        {
            btnName: props.currentUserDetails?.['name'] || '',
            type: 'dropdown',
            items: [
                {
                    displayName: 'Copy Code',
                    onClick: copySecretCode
                },
                {
                    displayName: 'Logout',
                    onClick: signOutUser
                }
            ],
            position: 'right',

        }
    ];
    
    const [showModal, setShowModal] = useState(false)

    function handleModal(){
        setShowModal(!showModal);
    }

    async function copySecretCode(){
        navigator.clipboard.writeText(props.currentUser.uid);
    }

    return (
        <div>
            <TopNavigation navMenu={navMenu} />

            {
                showModal?
                <Modal {...{handleModal, component: <Room {...{...props, handleModal}}/>}}/>
                :
                ""
            }

            <div className={"row m-bot"}>
                <RoomsList {...{...props, handleModal}} />
                <div className={"col-4 right"}>
                    <h2>Pending payments</h2>
                    <div className={"pending-payments"}>
                        <div>
                            <h2>Room 1</h2>
                            <p>Pending payment is $5000</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"footer"}>
                <h3>Money splicer</h3>
            </div>
        </div>
    );
}