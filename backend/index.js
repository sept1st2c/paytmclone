const express = require("express");

const app = express();
var cors = require("cors");

const mainRouter = require("./routes/index");
app.use(express.json());
app.use("/api/v1", mainRouter);
app.use(cors());

app.listen(3000);
