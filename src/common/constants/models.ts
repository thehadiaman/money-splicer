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