import { ref, set,  push, onValue } from "firebase/database";
import { ROOM_COLLECTION, USER_COLLECTION } from "../../../common/constants/collections";
import { database } from "../../setup";
import { IRoom } from "./room.interfaces";
import { generateRandomNumber } from "../../../common/functions/generateRandomNumber";
import { popupModel } from "../../../common/constants/models";
import { clone } from "../../../common/functions/cloneData";

export async function createRoomService(roomData: IRoom, uid: number, handleError: Function, handleModal: Function){

    if(!roomData.roomName){
        popupModel['title'] = 'Name is required';
        popupModel['message'] = 'Name is required for room';
        popupModel['color'] = 'warning';
        handleError(clone(popupModel));
        return;
    }

    /**
     * Creating a random number with 20 digits
     * It have ninety quintillion (9*(10^90)) possibilities to get the same number.
     */
    let roomId = uid + generateRandomNumber(20);
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


export async function getRoomService({uid, setRooms, roomId, setRoom, setRoomMates, setNotAMate}: any){

    if(roomId){
        const rooms = ref(database, `${ROOM_COLLECTION}/${roomId}`);
        
        const arrUser: any[] = [];
        onValue(rooms, (snapshot)=>{
            let roomVal = snapshot.val();
            setRoom({...roomVal, roomId})
            const users = ref(database, `${USER_COLLECTION}/`);
            onValue(users, (userSnapshot)=>{
                const userVal = userSnapshot.val();
                Object.values(roomVal.members).forEach((mId: any) => {
                    if(uid===mId) setNotAMate(false);
                    arrUser.push({...userVal[mId], uid: mId})
                });
            })

            setRoomMates(arrUser);
        })
        return;
    }

    const user = ref(database, `${USER_COLLECTION}/${uid}/rooms`);
    
    onValue(user, (snapshot) => {
        let userVal: any[] = snapshot.val();
        if(typeof(userVal) !== "object")  return;;
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

export function joinRoomService({roomId, uid}: any){
    
    const room = ref(database, `${ROOM_COLLECTION}/${roomId}/members`);
    push(room, uid)
    .then(
        ()=>{
            const user = ref(database, `${USER_COLLECTION}/${uid}/rooms`);
            push(user, roomId).then(
                ()=>document.location.reload()
            );;
        }
    )

}

export function exitRoomService({roomId, uid}: any){
    
    const room = ref(database, `${ROOM_COLLECTION}/${roomId}/members`);
    
    let members: Array<any> = [];
    let rooms: Array<any> = [];
    onValue(room, snapshot=>{
        members = !snapshot.val()?[]:Object.values(snapshot.val()).filter(
            userId=>userId!==uid
        );
    });
    set(room, members)
    .then(
        ()=>{
            const user = ref(database, `${USER_COLLECTION}/${uid}/rooms`);
            onValue(user, snapshot=>{
                rooms = [];
                rooms = !snapshot.val()?[]:Object.values(snapshot.val()).filter(
                    rId=>rId!==roomId
                );
            });
            set(user, rooms)
            .then(
                ()=>document.location.reload()
            );
        }
    )

}