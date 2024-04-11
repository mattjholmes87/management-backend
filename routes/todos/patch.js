const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middleware/test");
const asyncMySQL = require("../../mysql/driver");

//Delete a User Todos
router.patch("/todoData", checkToken, async (req, res) => {});

module.exports = router;
