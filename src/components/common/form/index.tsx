import { IForm } from "./interfaces";
import FormContainer from "./container/form";

/**
 * This common function dynamically generates form fields as per the input
 */
export default function Form(prop: IForm) {
    return (
        <FormContainer {...prop} />
    );

};
