export interface IPopupModel{
    title: string;
    message: string;
    color: 'info' | 'success' | 'warning' | 'error';
}

export const popupModel: IPopupModel = {
    title: '',
    message: '',
    color: 'info'
};

export interface ICurrentRoom{
    name: string;
    description: string;
    roomId: string;
}

export const currentRoomModel: ICurrentRoom = {
    name: '',
    description: '',
    roomId: ''
};

export interface IRoom{
    name: string;
    description: string;
    members: Array<any>;
    roomId: string;
}

export const roomModel: IRoom = {
    name: '',
    description: '',
    members: [],
    roomId: ''
};


export interface IRoomMate{
    name: string;
    uid: string;
}

export const roomMate: IRoomMate = {
    name: '',
    uid: ''
};

export const roomMatesModel: Array<IRoomMate> = [{
    name: '',
    uid: ''
}]


export interface IPaymentModel{
    paymentId: string;
    payment: number;
    mainPaymentId: string;
    uid: string;
    description: string;
    roomId: string;
    payments: Object
};


export const paymentModel: IPaymentModel = {
    paymentId: '',
    payment: 0,
    description: '',
    roomId: '',
    uid: '',
    mainPaymentId: '',
    payments: {
        0: {
            payment: 0,
            roomId: '',
            uid: '',
            user: {
                name: '',
                rooms: []
            }
        }
    }
};