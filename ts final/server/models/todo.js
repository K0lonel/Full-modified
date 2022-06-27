// models/todo.js
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    required: true,
  },
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;
