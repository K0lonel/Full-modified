import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";


const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});
const url = "/todo";

function App() {
  const [todos, setTodos] = useState<Array<Todo>>([]);

  const toggleComplete: ToggleComplete = (selectedTodoId) => {
    const item = todos?.filter((todo) => todo._id === selectedTodoId)[0];

    instance
      .put(url + `/${selectedTodoId}`, { ...item, complete: !item.complete })
      .then((res) => {
        const updatedTodos = todos?.map((todo) => {
          if (todo._id === selectedTodoId) {
            return { ...todo, complete: !todo.complete };
          }
          return todo;
        });
        setTodos(updatedTodos);
      })
      .catch((err) => console.log(err));
  };

  const addTodo: AddTodo = (newTodoText) => {
    if (newTodoText) {
      instance
        .post(url, {
          text: newTodoText,
          complete: false,
        })
        .then((res) => {
          console.log([...todos, { ...res.data }]);
          setTodos([...todos, { ...res.data.data }]);
        })
        .catch((err) => console.log(err));
    }
  };

  const removeTodo: RemoveTodo = (todoToRemoveId) => {
    instance.delete(url + `/${todoToRemoveId}`).then((res) => {
      let updatedTodos: Array<Todo> = todos?.filter(
        (todo) => todo._id !== todoToRemoveId
      );
      setTodos(updatedTodos);
    });
  };

  const editTodo: EditTodo = (todoToEdit) => {
    instance.put(url + `/${todoToEdit._id}`, todoToEdit).then(() => {
      let newTodos: Todo[] = todos?.map((todo) => {
        if (todo._id === todoToEdit._id) {
          return { ...todo, text: todoToEdit.text };
        } else {
          return todo;
        }
      });
      setTodos(newTodos);
    });
  };
  useEffect(() => {
    instance
      .get(url)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="todo-app">
      <header>
        <h1>Todo</h1>
      </header>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        onRemoveTodo={removeTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;
