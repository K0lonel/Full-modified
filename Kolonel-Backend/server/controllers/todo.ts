import Todo from "../models/todo"
import { Request, Response } from "express";


export const getAllTodo = (req: Request, res: Response) => {
  Todo.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message })
    );
};

interface postCreateTodoType {
  text: string; complete: string; _id: number
}


export const postCreateTodo = (req: Request, res: Response) => {
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
    .catch((err: any) =>
      res
        .status(400)
        .json({ message: "Failed to add todo", error: err.message })
    );
};

export const putUpdateTodo = (req: Request, res: Response) => {
  Todo.findByIdAndUpdate(req.params.id, req.body)
    .then((data) =>
      res.status(200).json({ message: "updated successfully", data })
    )
    .catch((err: any) =>
      res
        .status(400)
        .json({ message: "Failed to update todo", error: err.message })
    );
};


export const deleteTodo = (req: Request, res: Response) => {
  Todo.findByIdAndRemove(req.params.id, req.body)
    .then((data) =>
      res.status(200).json({ message: "todo deleted successfully", data })
    )
    .catch((err) =>
      res.status(404).json({ message: "book not found", error: err.message })
    );
};
