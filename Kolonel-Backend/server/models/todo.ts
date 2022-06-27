// models/todo.js
import { Schema, model} from "mongoose"

interface TodoInformation{
  text: string;
  complete: boolean;
}

const TodoSchema = new Schema<TodoInformation>({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
  },
});

const Todo = model<TodoInformation>("todo", TodoSchema);
module.exports = Todo;
