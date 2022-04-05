import React, {useState} from "react";

type EditTableSpanPropsType = {
    title: string
}

const EditTableSpan = (props: EditTableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
    }
    return (
        editMode    //
            ? <input
                value={props.title}
                autoFocus  // autoFocus={true}
                onBlur={offEditMode}
               />
            : <span
                onDoubleClick={onEditMode}
            >{props.title}</span>
    )
}

export default EditTableSpan