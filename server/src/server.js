import express from "express";
import cors from "cors";
import { errorHandler } from "../middleware/errorHandler.js";
import bookStoreRoutes from "../routes/bookStore.routes.js";
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/bookstore", bookStoreRoutes);

app.use(errorHandler);

app.listen(4545, () => {
    console.log("server is listening on port 4545");
});
