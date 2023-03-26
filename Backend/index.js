import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./models/Users.js";
import DataModel from "./models/Data.js";
import dotenv from "dotenv";
dotenv.config();
// const express = require("express");
const app = express();
// const mongoose = require("mongoose");
// const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL);

app.get("/getData", (req, res) => {
  DataModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/getTotal", (req, res) => {
  DataModel.aggregate([
    { $match: {} },
    { $group: { _id: null, total: { $sum: "$total" } } },
  ]).then((result) => {
    res.json(result);
    // console.log(result[0].total);
  });
});

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  console.log("*****************USER*****************");
  console.log(user);
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});

app.post("/createData", async (req, res) => {
  const data = req.body;
  console.log("*****************USER-DATA*****************");
  console.log(data);
  const newData = new DataModel(data);
  await newData.save();
  res.json(data);
});

app.put("/ban/:username", async (req, res) => {
  const username = req.params.username;

  const ban = req.body.ban;

  UserModel.findOneAndUpdate(
    { username: username },
    {
      $set: {
        ban: ban,
      },
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        if (data === null) {
          res.send("Nothing found!");
        } else {
          res.send(data);
          console.log(data);
        }
      }
    }
  );
});

app.put("/update/:username", async (req, res) => {
  let username = req.params.username;
  let profit = parseFloat(req.body.profit).toFixed(2);
  let coins = parseFloat(req.body.coins).toFixed(2);
  let IBM = req.body.IBM;
  let TSCO = req.body.TSCO;
  let DAI = req.body.DAI;
  let SHOP = req.body.SHOP;
  let GPV = req.body.GPV;
  let RELIANCE = req.body.RELIANCE;
  let start = req.body.start;
  let total = req.body.total;
  DataModel.findOneAndUpdate(
    { username: username },
    {
      $set: {
        profit: profit,
        coins: coins,
        IBM: IBM,
        TSCO: TSCO,
        DAI: DAI,
        SHOP: SHOP,
        GPV: GPV,
        RELIANCE: RELIANCE,
        start: start,
        total: total,
      },
    },
    { new: true },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        if (data === null) {
          res.send("Nothing found!");
        } else {
          res.send(data);
        }
      }
    }
  );
});

app.listen(process.env.PORT || 3002, () => {
  console.log(`Running on http://localhost:${process.env.PORT}`);
});
