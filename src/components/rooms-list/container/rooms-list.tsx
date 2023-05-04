import { useEffect, useState } from "react";
import { generateRandomNumber } from "../../../common/functions/generateRandomNumber";
import { getRoomService } from "../../../firebase/services/room/room.service";
import { useNavigate } from "react-router-dom";

export default function RoomsListContainer(props: any) {

    const [rooms, setRooms] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getRoomService({uid: props.currentUser.uid, setRooms});
    }, [props.currentUser.uid]);

    function openRoom(room: any){
        navigate(`/room/${room.roomId}`)
    }

    return (
        <div className={"col-8 rooms"}>
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
                <li onClick={()=>props.handleModal()} id={"add-new-room"} className="center-text hard-text">+</li>
            </ul>
        </div>
    );
}