import { IForm, IFormField } from "../../common/form/interfaces";
import Form from "../../common/form/container/form";
import { getFormData } from "../../../common/functions/getFormData";
import { useState } from "react";
import { createRoomService } from "../../../firebase/services/room/room.service";


export default function NewRoomContainer(props: any) {

    const inputFields: Array<IFormField> = [
        {
            name: 'roomName',
            id: 'roomName',
            type: 'text',
            placeholder: 'Room Name*',
            required: true,
            value: '',
            validation:{
               required: true,
               min_length: 3,
               max_length: 50,
               label: 'Room name'
            }
        },
        {
            name: 'roomDescription',
            id: 'roomDescription', 
            type: 'textarea',
            placeholder: 'Room description',
            required: true,
            value: '',
            validation:{
               max_length: 100,
               label: 'Room description'
            }
        }
    ];
    const [formFields, setFormFields] = useState(inputFields)

    const roomForm: IForm = {
        heading: 'Create room',
        fields: formFields,
        buttons: {
            buttons: [
                {
                    name: 'Clear',
                    backgroundColor: '#e63f3f',
                    onClick: resetForm,
                    type: 'reset'
                },
                {
                    name: 'Create',
                    backgroundColor: '#6771df',
                    backgroundColorHover: '#000291',
                    type: 'submit'
                }
            ],
            spacing: 10
        },
        valueSetter: setFormFields,
        onSubmit: createRoom
    };

    function createRoom(): void{
        let formData = getFormData(formFields);
        createRoomService(formData, props.currentUser.uid, props.handleError, props.handleModal);
    }

    function resetForm(): void{
        setFormFields(inputFields);
    }

    return (
        <Form {...roomForm} />
    );
}