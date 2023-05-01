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