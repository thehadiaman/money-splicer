import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { exitRoomService, getRoomService, joinRoomService } from "../../../firebase/services/room/room.service";
import Modal from "../../common/modal";
import Payment from "../../payment";
import { paymentModel, roomMatesModel, roomModel } from "../../../common/constants/models";
import { checkPaymentService, getPaymentService } from "../../../firebase/services/payment/payment.service";
import { generateRandomNumber } from "../../../common/functions/generateRandomNumber";
import { clone } from "../../../common/functions/cloneData";

export default function RoomPageContainer(props: any) {

    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [room, setRoom] = useState(roomModel);
    const [paymentUpdate, setPaymentUpdate] = useState(paymentModel);
    const [roomMates, setRoomMates] = useState(roomMatesModel);
    const [payments, setPayment] = useState([paymentModel]);
    let [isNotAMate, setNotAMate] = useState(true);

    function handleModal({ objPayment = null }: any = {}) {
        if (showModal) setPaymentUpdate(paymentModel);
        setShowModal(!showModal);
        if (objPayment) setPaymentUpdate(objPayment);
    }

    function joinRoom() {
        joinRoomService({ roomId: clone(room.roomId), uid: clone(props.currentUser.uid) })
    }

    useEffect(() => {
        let roomId = location.pathname.split('/room/')[1];
        getRoomService({ roomId, setRoom, setRoomMates, uid: props.currentUser.uid, setNotAMate });
        getPaymentService({
            uid: props.currentUser.uid,
            roomId,
            setPayment
        });
        document.title = room.name;
    }, [location.pathname, props.currentUser.uid, room.name]);


    function checkPayment(uid: string, roomId: string, paymentId: string) {
        checkPaymentService(uid, roomId, paymentId)
    }

    function exitRoom(){
        exitRoomService({
            roomId: room.roomId,
            uid: props.currentUser.uid
        });
    }

    return (
        <div className={'row m-bot'}>
            {
                showModal ?
                    <Modal {...{ handleModal, component: <Payment {...{ ...props, handleModal, paymentUpdate, roomMates, roomId: room.roomId }} /> }} />
                    :
                    ""
            }
            <div className={"col-3"}></div>
            <div className={"col-6 rooms"}>
                <div className="m-bot-10">
                    {!isNotAMate ?
                        <button onClick={exitRoom} className={"exit-room-mate"}>
                            Exit Room
                        </button> :
                        ""
                    }
                </div>
                <h1>{room?.name}</h1>
                <ul>
                    {
                        payments !== null &&
                        payments.map(
                            payment => {
                                return <li key={payment.mainPaymentId}>
                                    <ul>
                                        {
                                            payment.mainPaymentId.startsWith(props.currentUser.uid) ?
                                                <button onClick={() => payment ? handleModal({ objPayment: payment }) : null} className={"edit-button"}>&#9998;</button> :
                                                ""
                                        }
                                        <h2>{payment.payment}</h2><p>{payment.description}</p>
                                        {
                                            Object.values(payment.payments).map(
                                                (paymentData: any) => {
                                                    return <li
                                                        key={generateRandomNumber(5)}>
                                                        {paymentData.user.name}: <b>$ {paymentData.payment}</b>

                                                        {!isNotAMate?<div className={"check-box fr"}>
                                                            <label className={"container"}>
                                                                <input type="checkbox"
                                                                    disabled={paymentData.uid !== props.currentUser.uid}
                                                                    checked={paymentData.checked}
                                                                    onChange={() => {
                                                                        if (paymentData.uid === props.currentUser.uid) {
                                                                            checkPayment(paymentData.uid, paymentData.roomId, payment.mainPaymentId)
                                                                        }
                                                                    }}
                                                                />
                                                                <span
                                                                    className={`checkmark ${paymentData.uid !== props.currentUser.uid ? "not-mine-check-box" : ""}`}
                                                                ></span>
                                                            </label>
                                                        </div>:""}
                                                    </li>

                                                }
                                            )
                                        }
                                    </ul>
                                </li>
                            }
                        )
                    }
                    {
                        isNotAMate ?
                            <li onClick={joinRoom} className="center-text hard-text">Join the room</li> :
                            <li onClick={() => handleModal()} title="Add payment" className="center-text hard-text">+</li>
                    }
                </ul>
            </div>
            <div className={"col-3"}></div>
        </div>
    );
}