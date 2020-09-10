const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

mongoose
    .connect("mongodb://localhost:27017/farmer", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server running on port: " + PORT);
        });
    })
    .catch((err) => {
        console.error("Cannot connect to db: " + err);
        process.exit();
    });
