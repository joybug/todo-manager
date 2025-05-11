import React, {useContext} from "react";
import { TodoDispatchContext } from "../App";

import "./TodoItem.css";

const TodoItem = ({id,content,isDone,createdDate}) => {

    console.log(`${id} TodoItem 렌더링`);

    const { onUpdate, onDelete } = useContext(TodoDispatchContext);

    const onChangeCheckbox = () => {
        onUpdate(id);
    };

    const onClickDelete = () => {
        onDelete(id);
    }
    
    return (
        <div className="TodoItem">
            <div className="TodoItem_col">
                <input type="checkbox" 
                checked={isDone}
                onChange={onChangeCheckbox}/>
            </div>
            <div className="title_col">{content}</div>
            <div className="date_col">{new Date(createdDate).toLocaleDateString()}</div>
            <div className="button_col">
                <button onClick={onClickDelete} >삭제</button>
            </div>
        </div>
    );
}

export default React.memo(TodoItem);