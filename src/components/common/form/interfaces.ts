export interface IFormField{
    name: string;
    id: string;
    value: string;
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
    type: "button" | "submit" | "reset";
}

export interface IButton{
    spacing: number;
    buttons: Array<IFormButton>;
}

export interface IForm{
    heading: string;
    subHeading?: string;
    fields: Array<IFormField>;
    buttons: IButton;
    description?: string;
    valueSetter?: Function;
    onSubmit?: Function;
}