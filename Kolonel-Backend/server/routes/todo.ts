import express from "express"


const router = express.Router();

import {
  getAllTodo,
  postCreateTodo,
  putUpdateTodo,
  deleteTodo,
} from "../controllers/todo"

router.get("/", getAllTodo);

router.post("/", postCreateTodo);

router.put("/:id", putUpdateTodo);

router.delete("/:id", deleteTodo);

export default router;
