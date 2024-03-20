const dbconnection = require("../db/dbConfig");
const statusCodes = require("http-status-codes");

async function allANScontroller(req, res) {
  try {
    const [selecttables] = await dbconnection.query(
      "SELECT answers.answer,answers.questionid,users.username FROM answers  JOIN users ON users.userid =  answers.userid ORDER BY  answers.answerid DESC "
    );

    res.status(statusCodes.StatusCodes.OK).json({ selecttables });
  } catch (error) {
    console.log(error);
    return res
      .status(statusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

async function singANScontroller(req, res) {
  const { Answer, Questionid, Answerid, Userid } = req.body;

  try {
    await dbconnection.query(
      "INSERT INTO answers (answer,questionid,answerid,userid) VALUES (?,?,?,?)",
      [Answer, Questionid, Answerid, Userid]
    );

    res.status(201).json({ msg: "the answer is posted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(statusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

module.exports = { allANScontroller, singANScontroller };
