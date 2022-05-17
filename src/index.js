const express = require("express");
const morgan = require("morgan");
const conectarDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(express.json({ extended: true }));

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

conectarDB();

app.use("/api/", require("./routes/webHook"));

app.listen(app.get("port"), () => {
  console.log(`Server port: ${app.get("port")}`);
});
