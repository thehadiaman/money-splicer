import ButtonGroupContainer from "./container.tsx/button";
import { IButtonGroup } from "./interfaces";

export default function ButtonGroup(prop: IButtonGroup) {


    return (
        <ButtonGroupContainer {...prop}/>
    );
}