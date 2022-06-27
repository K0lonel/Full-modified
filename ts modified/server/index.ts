const express = require("express");
const { NextFunction, Request, Response } = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes/todo");

const app = express();
connectDB();


app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.use("/api/todo", routes);
app.get("/", (req:Request, res:Response) => res.send("Server up and running"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});



