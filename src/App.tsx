import {
  Fragment,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

type TodoItem = {
  id: number;
  task: string;
  isDone: boolean;
};

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const finishedTasksCount = todos.filter((todo) => todo.isDone).length;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTask(e.target.value);

  const onAddTodo = () => {
    setTodos((todos) => [
      ...todos,
      { task, isDone: false, id: new Date().getTime() },
    ]);
    setTask("");
  };

  const onDelete = (id: number) => () => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const onToggleTask = (id: number) => () => {
    setTodos((todos) =>
      todos.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      })
    );
  };

  return (
    <>
      <h1>To Do List</h1>
      <div>
        <input type="text" value={task} onChange={onChange} />
        <button type="button" onClick={onAddTodo}
        style={{ backgroundColor: "blue" }}
        >
          +
        </button>
      </div>

      <h4>Finished Task Count: {finishedTasksCount}</h4>

      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={onToggleTask(todo.id)}
              />
              {todo.isDone ? <s>{todo.task}</s> : todo.task}
              <button
                className=""
                style={{ backgroundColor: "red" }}
                onClick={onDelete(todo.id)}
              >
                x
              </button>{" "}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;