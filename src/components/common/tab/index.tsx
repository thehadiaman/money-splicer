import TabsContainer from "./container/tabs";
import { ITabs } from "./interfaces";

export default function Tabs(prop: ITabs) {


    return (
        <TabsContainer {...prop}/>
    );
}