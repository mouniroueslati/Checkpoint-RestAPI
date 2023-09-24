require("dotenv").config();
// import express
require("./config/database");
const express = require("express");
const user = require("./models/user");

//call the environnement variable
//let name = process.env.NAME;

const app = express();
app.use(express.json());

app.get("/allusers", (req, res) => {
  user
    .find()
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((e) => {
      return res.status(500).json(e);
    });
});

app.post("/add", (req, res) => {
  const { firstname, lastname, password } = req.body;

  //create instance user
  const addnewuser = new user({
    firstname: firstname,
    lastname: lastname,
    password: password,
  });

  //save instance

  addnewuser
    .save()
    .then(() => {
      return res.status(200).json({ message: "added" });
    })
    .catch((e) => {
      return res.status(500).json(e);
    });
});

app.put("/:id", (req, res) => {
  const { firstname, lastname, password } = req.body;
  const { id } = req.params;

  user
    .findByIdAndUpdate(id, { firstname, lastname, password })
    .then(() => {
      return res.status(200).json({ message: "updated" });
    })
    .catch((e) => {
      return res.status(500).json(e);
    });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  user
    .findByIdAndDelete(id)
    .then(() => {
      return res.status(200).json({ message: "deleted" });
    })
    .catch((e) => {
      return res.status(500).json(e);
    });
});

app.listen(8080);
