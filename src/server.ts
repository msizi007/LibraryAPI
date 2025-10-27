import bodyParser from "body-parser";
import express, { Express } from "express";
import authorRouter from "./routes/author";
import bookRouter from "./routes/book";
import { logger } from "./middleware/logger";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(logger);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
