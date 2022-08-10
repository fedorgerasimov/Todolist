import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from "react";

type EditTableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditTableSpan = React.memo((props: EditTableSpanPropsType) => {
    console.log("EditableSpan is called")
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)

    /*const onDoubleClickHandler = () => { можно одной функций менять
        setEditMode(!editMode)
         props.changeTitle(title)
    }*/

    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onKeyPressOffEditMode = (event: KeyboardEvent<HTMLInputElement>) => { // добавил усл. при нажатии enter
        event.key === 'Enter' && offEditMode()
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
                onKeyPress={onKeyPressOffEditMode}
            />
            : <span
                style={{fontWeight: "bold"}}
                onDoubleClick={onEditMode}
            >{props.title}</span>
    )
})

export default EditTableSpan