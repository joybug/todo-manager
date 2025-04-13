import { useRef, useState } from "react";
import "./TodoEditor.css";

const TodoEditor = ({onCreate}) => {
    const [content, setContent] = useState("");
    const inputRdf = useRef();
    const onChangeContent = (e) => {
        setContent(e.target.value);

    };

    const onSubmit = (e) => {
        if(!content) {
            inputRdf.current.focus();
            return;
        }

        onCreate(content);
        setContent("");
    };

    const onKeyDown = (e) => {
        if(e.key === "Enter") {
            onSubmit();
        }
    };

    return (
        <div className="TodoEditor">
          <h4>새로운 Todo 작성하기 ✏️</h4>  
          <div className="editor_wrapper">
            <input 
            ref={inputRdf}
            value={content}
            onChange={onChangeContent}
            onKeyDown={onKeyDown}
            placeholder="새로운 Todo..." />
            <button onClick={onSubmit}>추가</button>
          </div>
        </div>
    );
};

export default TodoEditor;