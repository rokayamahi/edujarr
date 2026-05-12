require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const { dbConfig } = require("./config/db");
const { globalErrorHandler } = require("./utils/globalErrorHandler");

const app = express();
const port = process.env.PORT || 8000;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

dbConfig();


app.use("/", require("./route"))
app.use(globalErrorHandler)




app.listen(port, () => {
    console.log(`server is running...port no ${port}`)
})