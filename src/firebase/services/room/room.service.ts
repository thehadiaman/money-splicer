import { ref, set, update, push, onValue, startAfter, orderByValue } from "firebase/database";
import { ROOM_COLLECTION, USER_COLLECTION } from "../../../common/constants/collections";
import { database } from "../../setup";
import { IRoom } from "./room.interfaces";
import { generateRandomNumber } from "../../../common/functions/generateRandomNumber";
import { popupModel } from "../../../common/constants/models";

export async function createRoomService(roomData: IRoom, uid: number, handleError: Function, handleModal: Function){

    if(!roomData.roomName){
        popupModel['title'] = 'Name is required';
        popupModel['message'] = 'Name is required for room';
        popupModel['color'] = 'warning';
        handleError(JSON.parse(JSON.stringify(popupModel)));
        return;
    }

    /**
     * Creating a random number with 20 digits
     * It have ninety quintillion (9*(10^90)) possibilities to get the same number.
     */
    let roomId = uid + generateRandomNumber(20);
    let rooms  = ref(database, `${USER_COLLECTION}/${uid}/rooms/`);
    onValue(rooms, (data)=>console.log(data.val()))
    set(ref(database, `${ROOM_COLLECTION}/` + roomId), {
        name: roomData.roomName,
        description: roomData.roomDescription,
        members: [uid]
    }).then(
        ()=>{
            push(ref(database, `${USER_COLLECTION}/${uid}/rooms/`),roomId)
            handleModal();
        }
    )
  
}


export async function getRoomService(uid: number, setRooms: Function){

    const user = ref(database, `${USER_COLLECTION}/${uid}/rooms`);
    
    
    onValue(user, (snapshot) => {
        let userVal: any[] = snapshot.val();
        if(typeof(userVal) !== "object")  return;
        let arrRoomId: any[] = [];
        if(userVal){
            arrRoomId = Object.values(userVal);
        }
        const rooms = ref(database, `${ROOM_COLLECTION}`);

        let filteredRooms: any[] = [];

        onValue(rooms, (rooms)=>{
            let roomData = rooms.val()
            arrRoomId.forEach(roomId=>{
                roomData[roomId]['roomId'] = roomId;
                filteredRooms.push(roomData[roomId]);
            });
            setRooms(filteredRooms);
        });
        
    });
  
}