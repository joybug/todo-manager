import { useCallback, useReducer, useRef } from 'react';

import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';


const MockTodo = [
  { id: 0, content: "React 공부하기", isDone: false, createdDate: new Date().getTime() },
  { id: 1, content: "리액트 복습하기", isDone: false, createdDate: new Date().getTime() },
  { id: 2, content: "프로젝트 만들기", isDone: false, createdDate: new Date().getTime() },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return [action.newItem,...state];
    case 'UPDATE':
      return state.map((it) => 
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it
      );
    case 'DELETE':
      return state.filter((it) => it.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  // const [todo, setTodo] = useState(MockTodo); 
  const [todo,dispatch] = useReducer(reducer, MockTodo);
  const idRef = useRef(3);
 
  const onCreate = (content) => {
    dispatch({
      type: 'CREATE',
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  const onUpdate = useCallback( (targetId) => {
    dispatch({ type: 'UPDATE', targetId });    
  },[]);

  const onDelete = useCallback( (targetId) => {
    dispatch({ type: 'DELETE', targetId });    
  },[]);

  return (<div className="App">
      <Header/>
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>);
}

export default App;
