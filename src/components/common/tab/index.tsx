import TabsContainer from "./container/tabs";
import { ITabs } from "./interfaces";

function openCity(cityName:any): void{
    
}
export default function Tabs(prop: ITabs) {


    return (
        <TabsContainer {...prop}/>
    );
}