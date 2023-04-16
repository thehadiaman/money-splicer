export interface IFormFields{
    name: string;
    id: string;
    value?: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    hidden?: boolean;
}

export interface IFormButton{
    name: string;
    onClick?: Function;
    color?: string;
    colorHover?: string;
    backgroundColor?: string;
    backgroundColorHover?: string;
    disabled?: boolean;
}

export interface IButton{
    spacing: number;
    buttons: Array<IFormButton>;
}

export interface IForm{
    heading: string;
    subHeading?: string;
    fields: Array<IFormFields>;
    buttons: IButton;
    description?: string;
}