import SnackBarContainer from "./container/snackbar";
import { ISnackBar } from "./interfaces";

export default function SnackBar(prop: ISnackBar) {


    return (
        <SnackBarContainer {...prop}/>
    );
}