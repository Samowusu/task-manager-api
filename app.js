require("dotenv").config();
const express = require("express");
const app = express();

const tasksRoute = require("./routes/tasks");
const connectDB = require("./db/connection");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.static("./public"));

//routes

app.use("/api/v1/tasks", tasksRoute);
app.use(errorHandler);
app.use(notFound);

const init = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
