import { useEffect, useState } from "react";
import { ISnackBar } from "../interfaces";
import { MAX_NUMBER_OF_LETTERS_IN_ERROR_SNACKBAR } from "../../../../common/constants/component.variables";

export default function SnackBarContainer(prop: ISnackBar) {

    const [isSnackBarVisible, setSnackBarVisible] = useState(false);

    /**
         * To limit characters of error message
         */
    let errorMessage = prop.errorMessage.slice(0, MAX_NUMBER_OF_LETTERS_IN_ERROR_SNACKBAR)
    errorMessage += (prop.errorMessage.length>100)?'...':'';

    useEffect(()=>{
        if(prop.errorMessage){
            setSnackBarVisible(true)
        }
        setTimeout(
            ()=>{
                setSnackBarVisible(false)
            },
            4000
        );

    }, [prop, prop.errorMessage])

    return (
        <div className={`
                        snackbar
                        ${prop.color?prop.color:''}
                        ${(prop.errorMessage && isSnackBarVisible)?'show':''}
                        `}>
            <h2>{prop.errorTitle}</h2>
            {errorMessage}
        </div>
    );
}