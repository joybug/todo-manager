import { useState, useRef } from 'react';

import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';


const MockTodo = [
  { id: 0, content: "React 공부하기", isDone: false, createdDate: new Date().getTime() },
  { id: 1, content: "리액트 복습하기", isDone: false, createdDate: new Date().getTime() },
  { id: 2, content: "프로젝트 만들기", isDone: false, createdDate: new Date().getTime() },
];

function App() {
  const [todo, setTodo] = useState(MockTodo); 
  const idRef = useRef(3);
  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    };
    const nextTodo = [newTodo,...todo];
    setTodo(nextTodo);
    idRef.current += 1;
  };

  const onUpdate = (targetId) => {
    setTodo(todo.map((it) => 
      it.id === targetId ? {...it, isDone: !it.isDone} : it
    ));
    
  };

  const onDelete = (targetId) => {
    setTodo(todo.filter((it) => it.id !== targetId));
  };

  return (<div className="App">
      <Header/>
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>);
}

export default App;
