import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';

type PropsType = {
    callBack: (title: string) => void
}

export const FullInput = ({callBack, ...props}: PropsType) => {
    // let [title, setTitle] = useState("")
    let title=useRef<HTMLInputElement>(null)
    let [error, setError] = useState<string | null>(null)


    const addTask = () => {
        //let newTitle = title.trim();
        if(title.current && title.current.value.trim() !== ''){
            callBack(title.current.value.trim())
            title.current.value=''
        } else {
            setError("Title is required");
        }

        // if (newTitle !== "") {
        //     callBack(newTitle);
        //     setTitle("");
        //
        // } else {
        //     setError("Title is required");
        // }
    }

    /*    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }*/

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    return (
        <div>
            <input ref={title}
                //onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
