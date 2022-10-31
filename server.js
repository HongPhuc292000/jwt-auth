import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const books = [
  {
    id: 1,
    name: "Chi pheo",
    author: "Helen",
  },
  {
    id: 2,
    name: "Chi pheo 1",
    author: "Helen",
  },
  {
    id: 2,
    name: "Chi pheo 2",
    author: "Helen",
  },
];

app.get("/books", authToken, (req, res) => {
  res.json({ status: "Success", data: books });
});

function authToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) res.sendStatus(403);
    next();
  });
}

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
