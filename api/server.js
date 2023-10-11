const express = require("express");
const RecipeRouter = require('./recipe-router');
const morgan = require("morgan");


const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.use("/api/recipes",RecipeRouter)

module.exports = server; 