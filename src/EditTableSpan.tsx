import React, {ChangeEvent, useState} from "react";

type EditTableSpanPropsType = {
    title: string
    changeTitle: (title:string)=> void
}

const EditTableSpan = (props: EditTableSpanPropsType) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    return (
        editMode    //
            ? <input
                value={title}
                autoFocus  // autoFocus={true}
                onBlur={offEditMode}
                onChange={onChangeHandler}
               />
            : <span
                style={{fontWeight:"bold"}}
                onDoubleClick={onEditMode}
            >{props.title}</span>
    )
}

export default EditTableSpan