type AddTodo = (newTodoText: string) => void;
type RemoveTodo = (todoToRemoveId: string) => void;
type EditTodo = (todoToEdit: Todo) => void;

type Todo = {
  _id: string;
  text: string;
  complete: boolean;
};

type ToggleComplete = (selectedTodoId: string) => void;

type Option = {
  value: string;
  onClick: () => void;
  color?: string;
};
