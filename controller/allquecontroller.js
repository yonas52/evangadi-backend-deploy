const dbconnection = require("../db/dbConfig");
const statusCodes = require("http-status-codes");

async function allquecontroller(req, res) {
  try {
    const [selecttables] = await dbconnection.query(
      "SELECT questions.title,questions.questionid,questions.description,users.username,users.userid FROM questions  JOIN users ON users.userid = questions.userid ORDER BY questions.id DESC"
    );
    const userid = selecttables[0].userid;
    console.log(userid);

    res.status(statusCodes.StatusCodes.OK).json({ selecttables });
  } catch (error) {
    console.log(error);
    return res
      .status(statusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

async function singquecontroller(req, res) {
  const { title, descripition, questionid, userid } = req.body;

  if (!title || !descripition) {
    return res.status(400).json({ msg: "Title and description are required" });
  }
  try {
    await dbconnection.query(
      "INSERT INTO questions (title,description,questionid,userid) VALUES (?,?,?,?)",
      [title, descripition, questionid, userid]
    );

    res
      .status(201)
      .json({
        msg: " Question is posted successfully. Redirecting to home page...",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(statusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

module.exports = { allquecontroller, singquecontroller };
