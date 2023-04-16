import ButtonGroup from "../../button";
import { IForm, IFormFields } from "../interfaces";

/**
 * This common function dynamically generates form fields as per the input
 */
export default function FormContainer(form: IForm) {

    return (
        <div key={`form-${form.heading}`}>
            {
                form.heading&&
                <h3 key={`form-${form.heading}-h3`}>{form.heading}</h3>
            }
            {
                form.subHeading&&
                <h4 key={`form-${form.subHeading}-h4`}>{form.subHeading}</h4>
            }
            {
                form.fields.map(
                    (inputField: IFormFields) => {
                        return  <fieldset key={`form-${form.heading}-${inputField.name}`}>
                                    <input
                                        name={inputField.name}
                                        value={inputField.value}
                                        key={inputField.name}
                                        type={inputField.type}
                                        required={!inputField.required?true:false}
                                        placeholder={inputField.placeholder}
                                    />
                                </fieldset>
                    
                    }
                )
            }
            {
                <ButtonGroup {...form.buttons} />
            }
        </div>
    );

};
