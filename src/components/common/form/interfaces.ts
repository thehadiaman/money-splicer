export interface IFormField{
    name: string;
    id: string;
    value: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    hidden?: boolean;
    validation?: IValidate;
    touched?: boolean;
    focused?: boolean;
    cols?: number;
    rows?: number;
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

export interface IValidate{
    email?: boolean;
    required?: boolean;
    min_length?: number;
    max_length?: number;
    label?: string;
}