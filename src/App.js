import React, { useCallback, useReducer, useRef, useMemo } from 'react';
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

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();

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

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (<div className="App">
      <Header/>
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor/>
          <TodoList/>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>);
}

export default App;
