const express = require("express");
const connectDB = require("./config/db");
const app = express();
const apiRouter = require("./routes");

connectDB();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/", apiRouter);

app.listen(PORT, () => {
  console.log("Server is up and Running...");
});
