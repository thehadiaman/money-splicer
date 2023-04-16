export interface ITab{
    name: string;
    component: JSX.Element;
    onClick?: Function;
}

export interface ITabs{
    tabs: Array<ITab>;
    spacing?: number;
}