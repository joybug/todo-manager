import "./TodoItem.css";

const TodoItem = () => {
    return (
        <div className="TodoItem">
            <div className="TodoItem_col">
                <input type="checkbox" />
            </div>
            <div className="title_col">할 일</div>
            <div className="date_col">{new Date().toLocaleDateString()}</div>
            <div className="button_col">
                <button>삭제</button>
            </div>
        </div>
    );
}

export default TodoItem;