import React, { useState } from "react";
import { Dropdown } from "./Dropdown";

interface TodoListItemProps {
  todo: Todo;
  toggleComplete: ToggleComplete;
  onRemoveTodo: RemoveTodo;
  editTodo: EditTodo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  toggleComplete,
  onRemoveTodo,
  editTodo,
}) => {
  const [isEditOn, setIsEditOn] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(todo.text);

  const onDelete = () => {
    onRemoveTodo(todo._id);
  };

  const onEdit = () => {
    setIsEditOn(true);
    setInputText(todo.text);
  };

  const onTodoUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo({ ...todo, text: inputText });
    setInputText("");
    setIsEditOn(false);
  };

  const dropdownOptions: Array<Option> = [
    {
      value: "Delete",
      onClick: onDelete,
      color: "red",
    },
    {
      value: "Edit",
      onClick: onEdit,
      color: "blue",
    },
  ];

  return (
    <li className={todo.complete ? "todo-row completed" : "todo-row"}>
      <div className="edit">
        {isEditOn ? (
          <form onSubmit={onTodoUpdate}>
            <input
              className="edit-input"
              type="text"
              value={inputText}
              autoFocus
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="edit-options">Update</button>
            <button type="button" className="edit-options" onClick={() => setIsEditOn(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <input
              type="checkbox"
              onChange={() => toggleComplete(todo._id)}
              checked={todo.complete}
            />
            {todo.text}
          </>
        )}
      </div>
      {!isEditOn && <Dropdown options={dropdownOptions} />}
    </li>
  );
};
