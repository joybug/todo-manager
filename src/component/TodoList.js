import { useState,useMemo } from "react";
import "./TodoList.css"
import TodoItem from "./TodoItem";

const TodoList = ({todo, onUpdate, onDelete}) => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearchResult = () => {
        return search === "" ? todo : todo.filter((it) => 
            it.content.toLowerCase().includes(search.toLowerCase()));
    };

    const analyzeTodo = useMemo(() => {
        console.log("analyzeTodo 함수 호출");
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return { totalCount, doneCount, notDoneCount };
    }, [todo]);

    const { totalCount, doneCount, notDoneCount } = analyzeTodo;

    return (
        <div className="TodoList">
            <h4>Todo List 🌿</h4>
            <div className="todo_count">
                <div>총 {totalCount}개</div>
                <div>완료 {doneCount}개</div>
                <div>미완료 {notDoneCount}개</div>
            </div>
            <input 
            onChange={onChangeSearch}
            value={search}
            className="searchbar" 
            placeholder="검색어를 입력하세요" />
            <div className="list_wrapper">
            {getSearchResult().map((it) => (
                <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
            </div>  
        </div>
    );
};
export default TodoList;
