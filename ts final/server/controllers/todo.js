const Todo = require("../models/todo");

exports.getAllTodo = (req, res) => {
  Todo.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message })
    );
};

exports.postCreateTodo = (req, res) => {
  Todo.create(req.body)
    .then(({ text, complete, _id }) => {
      // console.log(data);
      res
        .status(200)
        .json({
          message: "Todo added successfully",
          data: { text, complete, _id },
        });
    })
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to add todo", error: err.message })
    );
};

exports.putUpdateTodo = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body)
    .then((data) =>
      res.status(200).json({ message: "updated successfully", data })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update todo", error: err.message })
    );
};

exports.deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id, req.body)
    .then((data) =>
      res.status(200).json({ message: "todo deleted successfully", data })
    )
    .catch((err) =>
      res.status(404).json({ message: "book not found", error: err.message })
    );
};
