const express = require("express");
const router = express.Router();

//all question controller
const {
  allANScontroller,
  singANScontroller,
} = require("../controller/allAnscontroller");

//all answers roiuter
router.get("/all-answers", allANScontroller);

//single single answer router
router.post("/single-answer", singANScontroller);

module.exports = router;
