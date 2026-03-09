import bodyParser from "body-parser";
import express, { Express } from "express";
import authorRouter from "./routes/author";
import bookRouter from "./routes/book";
import { logger } from "./middleware/logger";
import { Request, Response } from "express";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("static"));
app.use(logger);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.get("/", (req: Request, res: Response) => res.sendFile("index.html"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
