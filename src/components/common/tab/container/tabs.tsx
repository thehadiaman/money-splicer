import { useState } from "react";
import { ITab, ITabs } from "../interfaces";

export default function TabsContainer(tabs: ITabs) {
    
    let [tabIndex, setTabIndex] = useState(0);
    let buttonStyle = {width: `${100/tabs.tabs.length}%`};

    function handleTabClick (cbFunction: Function|null|undefined, index: number):void{
        setTabIndex(index);
        if(cbFunction) cbFunction();
    }
    
    return (
        <div>

            {/* Rendering tabs */}
            <div key={`tabs-div`} className={"btn-group"} style={{width:'100%'}}>
                {
                    tabs.tabs.map(
                        ((tab: ITab, index: number)=>{
                            return <button
                                key={`tabs-btn-${tab.name}`}
                                className={tabIndex===index?"btn-group-button-active":""}
                                style={buttonStyle}
                                onClick={()=>handleTabClick(tab.onClick, index)}
                                >{tab.name}</button>
                        })
                    )
                }
            </div>
            {/* Rendering the selected component */}
            {tabs.tabs[tabIndex].component}
        </div>
    );
}