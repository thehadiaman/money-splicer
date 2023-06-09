import { validateForm } from "../../../../common/functions/validateForm";
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
                field['touched'] = true;
                field['value'] = fieldValue;
            }
        });
        if(form.valueSetter && isValueChange)
            form.valueSetter([...form.fields]);
    }
    function handleBlue(handleEvent: any){
        let isValueChange = false;
        const fieldName: string = handleEvent.target.name;
        form.fields.forEach((field: IFormField) => {
            if(field['name'] === fieldName && !field['focused']){
                field['focused'] = true;
                isValueChange = true;
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
                        let errMessage = validateForm(inputField.name, inputField.validation, inputField.value);
                        if(inputField.type === "textarea"){
                            return (
                                <fieldset key={`form-${form.heading}-${inputField.name}`}>
                                    { (errMessage && !!inputField.focused)?
                                        <p className={'form-validation-error-text'}>
                                            {errMessage}
                                        </p>:
                                        ""
                                    }
                                    <textarea
                                        name={inputField.name}
                                        id={inputField.id}
                                        cols={inputField.cols}
                                        value={inputField.value}
                                        rows={inputField.rows}
                                        key={inputField.name}
                                        placeholder={inputField.placeholder}
                                        onChange={handleValueChange}
                                        onBlur={handleBlue}
                                        className={
                                            ((errMessage && !!inputField.focused)
                                            || inputField.error)?
                                                'form-validation-error':
                                                ''
                                        }
                                    ></textarea>
                                </fieldset>
                            );
                        }
                        return  <fieldset key={`form-${form.heading}-${inputField.name}`}>
                                    { (errMessage && !!inputField.focused)?
                                        <p className={'form-validation-error-text'}>
                                            {errMessage}
                                        </p>:
                                        ""
                                    }
                                    {
                                        inputField.label?
                                        <label htmlFor={inputField.name}>{inputField.label}</label>:
                                        ""
                                    }
                                    <input
                                        className={
                                            (errMessage && !!inputField.focused)?
                                                'form-validation-error':
                                                ''
                                        }
                                        name={inputField.name}
                                        value={inputField.value}
                                        key={inputField.name}
                                        disabled={!!inputField.disabled}
                                        type={inputField.type}
                                        required={!inputField.required?true:false}
                                        placeholder={inputField.placeholder}
                                        onChange={
                                            (event)=> 
                                                inputField.onValueChange?
                                                inputField.onValueChange(event, handleValueChange, form.fields):
                                                handleValueChange(event)
                                        }
                                        onBlur={handleBlue}
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
