const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const todoModel = require("./Models/Todo");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://<cluster_name>:<db_password>@cluster0.egltx.mongodb.net/test"
);

app.get("/get", (req, res) => {
  todoModel
    .find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  todoModel
    .findByIdAndUpdate({ _id: id }, { done: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  todoModel
    .findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  todoModel
    .create({
      task: task,
    })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.listen(3000, () => {
  console.log("Server is running on the port number 3000");
});
