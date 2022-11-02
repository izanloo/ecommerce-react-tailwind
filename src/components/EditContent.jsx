import React from "react";
import ReactDOM from "react-dom";
import EasyEdit, { Types } from "react-easy-edit";


function EditContent() {
    const save = (value) => {
        alert(value);
    };

    const cancel = () => {
        alert("Cancelled");
    };

    const generateOptionsList = () => {
        return [
            { label: "First option", value: "one" },
            { label: "Second option", value: "two" },
            { label: "Third option", value: "three" }
        ];
    };

    return (
        <>
            <h3>Textbox</h3>
            <EasyEdit
                type={Types.TEXT}
                onSave={save}
                onCancel={cancel}
                saveButtonLabel="Save Me"
                cancelButtonLabel="Cancel Me"
                attributes={{ name: "awesome-input", id: 1 }}
                instructions="Star this repo!"
            />

        </>
    );
}
export default EditContent

