import React, {FC} from "react";

type ModalWindowPropsType = {
    name: string
}
// реструктуризация
export const ModalWindow:React.FC<ModalWindowPropsType> = ({name,children}) => {
    return (
        <div>
            <h1>{name}</h1>     {/*Name of modal Window*/}
            {children}           {/*сколько угодно информации*/}
            <button>Yes</button>
            <button>No</button>
        </div>
    )
}