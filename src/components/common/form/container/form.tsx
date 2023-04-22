import ButtonGroup from "../../button";
import { IForm, IFormField } from "../interfaces";

/**
 * This common function dynamically generates form fields as per the input
 */
export default function FormContainer(form: IForm) {

    function handleValueChange(handleEvent: any): void{
        const fieldName: string = handleEvent.target.name;
        const fieldValue: string = handleEvent.target.value;
        
        let isValueChange: boolean = false;
        form.fields.forEach((field: IFormField) => {
            if(field['name'] === fieldName){
                isValueChange = true;
                field['value'] = fieldValue;
            }
        });
        if(form.valueSetter && isValueChange)
            form.valueSetter([...form.fields]);
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(form.onSubmit)
            form.onSubmit();
    }

    return (
        <form onSubmit={handleFormSubmit} key={`form-${form.heading}`}>
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
                    (inputField: IFormField) => {
                        return  <fieldset key={`form-${form.heading}-${inputField.name}`}>
                                    <input
                                        name={inputField.name}
                                        value={inputField.value}
                                        key={inputField.name}
                                        type={inputField.type}
                                        required={!inputField.required?true:false}
                                        placeholder={inputField.placeholder}
                                        onChange={handleValueChange}
                                    />
                                </fieldset>
                    
                    }
                )
            }
            {
                <ButtonGroup {...form.buttons} />
            }
        </form>
    );

};
