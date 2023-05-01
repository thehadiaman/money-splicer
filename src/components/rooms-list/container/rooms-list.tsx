import { useEffect, useState } from "react";
import { generateRandomNumber } from "../../../common/functions/generateRandomNumber";
import { getRoomService } from "../../../firebase/services/room/room.service";
import Modal from "../../common/modal";
import { currentRoomModel } from "../../../common/constants/models";

export default function RoomsListContainer(props: any) {

    const [rooms, setRooms] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentRoom, setCurrentRoom] = useState(currentRoomModel)

    useEffect(() => {
        getRoomService(props.currentUser.uid, setRooms);
    }, [props.currentUser.uid]);

    function openRoom(room: any){
        handleModal()
        setCurrentRoom(room)
    }

    function handleModal(){
        setShowModal(!showModal);
    }

    return (
        <div className={"col-8 rooms"}>
            {
                showModal?
                    <Modal {...{handleModal, component: <div>Room{currentRoom.name}</div>}}/>
                :
                ""
            }
            <h2>Rooms</h2>
            <ul>
                {
                    rooms.map(
                        (room: any) => {
                            return <li
                                onClick={()=>openRoom(room)}
                                key={room.name + generateRandomNumber(5)}>
                                <h3>{room.name}</h3>
                                <p>{room.description}</p>
                            </li>
                        }
                    )
                }
                {
                    rooms.length === 0 ?
                        <li>No rooms...</li>
                        : ""
                }
                <li onClick={props.handleModal} id={"add-new-room"} className="center-text hard-text">+</li>
            </ul>
        </div>
    );
}