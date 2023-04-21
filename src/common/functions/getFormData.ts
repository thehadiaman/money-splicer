import { IFormField } from "../../components/common/form/interfaces";

export function getFormData(formFields: Array<IFormField>): any{
    
    const formData: any = {};

    for (let index = 0; index < formFields.length; index++) {
        const field: IFormField = formFields[index];
        formData[field.name] = field.value;
    }

    return formData;
}