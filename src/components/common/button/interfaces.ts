export interface IButton{
    name: string;
    onClick?: Function;
    color?: string;
    colorHover?: string;
    backgroundColor?: string;
    backgroundColorHover?: string;
    disabled?: boolean;
}

export interface IButtonGroup{
    buttons: Array<IButton>
    spacing?: number;
}