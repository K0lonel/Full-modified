import express, { Request, Response }  from "express"
import cors  from "cors"
import connectDB from "./config/db"
import routes  from "./routes/todo"

const app = express();
connectDB();


app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todo", routes);
app.get("/", (req:Request, res:Response) => res.send("Server up and running"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});



