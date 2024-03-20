const dbconnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const statusCodes = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(statusCodes.StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information!" });
  }
  try {
    const [user] = await dbconnection.query(
      "select username,userid from users where username = ? or email =? ",
      [username, email]
    );
    console.log(user);
    if (user.length > 0) {
      return res
        .status(statusCodes.StatusCodes.BAD_REQUEST)
        .json({ msg: "already registered" });
    }
    if (password.length <= 8) {
      return res
        .status(statusCodes.StatusCodes.BAD_REQUEST)
        .json({
          msg: "Either the user name or password your entered is incorrect",
        });
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);

    const hashedpassword = await bcrypt.hash(password, salt);

    await dbconnection.query(
      "INSERT INTO users (username, firstname,lastname,email,Password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashedpassword]
    );

    res.status(201).json({ msg: "user register" });
  } catch (error) {
    console.log(error);
    return res
      .status(statusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(statusCodes.StatusCodes.BAD_REQUEST)
      .json({ msg: "please eneter all required fields adddd" });
  }
  try {
    const [user] = await dbconnection.query(
      "select username,userid,Password from users where  email =? ",
      [email]
    );

    if (user.length == 0) {
      return res
        .status(statusCodes.StatusCodes.BAD_REQUEST)
        .json({ msg: "*Email provided doesn't have an account " });
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user[0].Password);
    if (!isMatch) {
      return res
        .status(statusCodes.StatusCodes.BAD_REQUEST)
        .json({ msg: "*password your entered is incorrect" });
    }

    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(statusCodes.StatusCodes.OK)
      .json({ msg: "user login successful", token, username });
  } catch (error) {
    console.log(error);
    return res
      .status(statusCodes.StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later" });
  }
}

async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  res
    .status(statusCodes.StatusCodes.OK)
    .json({ msg: "valid user", username, userid });
}

module.exports = { register, login, checkUser };
