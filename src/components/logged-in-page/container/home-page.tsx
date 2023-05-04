import { useEffect, useState } from "react";
import RoomsList from "../../rooms-list";
import Modal from "../../common/modal";
import NewRoom from "../../new-room";

export default function HomeContainer(props: any) {

    
    const [showModal, setShowModal] = useState(false)

    function handleModal(){
        setShowModal(!showModal);
    }

    useEffect(()=>{
        document.title = 'Home';
    }, []);

    return (
        <div>
            {
                showModal?
                    <Modal {...{handleModal, component: <NewRoom {...{...props, handleModal}} />}}/>
                :
                ""
            }
            <div className={"row m-bot"}>
                <div className={"col-2 rooms"}></div>
                <RoomsList {...{...props, handleModal}} />
                <div className={"col-2 rooms"}></div>
            </div>
        </div>
    );
}