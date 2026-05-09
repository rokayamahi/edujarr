require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { dbConfig } = require("./config/db");
const { globalErrorHandler } = require("./utils/globalErrorHandler");

dbConfig();

app.use(express.json());
app.use(require("./route"));
app.use(globalErrorHandler);

app.get("/", (req, res) => {
    res.send('Welcome to Edujarr API');
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
