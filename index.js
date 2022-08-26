import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// connecting to mongo db cluster
const CONNECTION_URL = process.env.DB_CONNECTION;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Serving running on port: ${PORT}\nConnected to database`)
    )
  )
  .catch((error) => console.log((error.message)));
