const express = require("express");
const { AddQuestion, AddCounterQuestion } = require("../controllers/Questions.controllers");
const quesRouter = express.Router()

quesRouter.post("/addQuestion", AddQuestion);
quesRouter.post("/addCounterQuestion", AddCounterQuestion);

module.exports = quesRouter