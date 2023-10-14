const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name.trim() || !email.trim() || !password.trim()) {
    return res.status(400).json({ msg: "Inputs can not be empty" });
  }
  if (password.length < 6) {
    return res.status(400).json({ msg: "Inputs shouldn't be empty" });
  }

  try {
    //console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const data = { name, email, password: hashedPassword };

    const user = await User.create(data);

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET_III,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(201).json({ user: { name: user.name }, token });
  } catch (error) {
    if (error.keyValue.email === email) {
      return res.status(401).json({ msg: "Email already exists." });
    }
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name.trim() || !email.trim() || !password.trim) {
    return res.status(400).json({ msg: "Inputs shouldn't be empty" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "user wasn't found" });
    }

    const verifyPassword = async (incomingPW, PWinDB) => {
      const isValid = await bcrypt.compare(incomingPW, PWinDB);
      return isValid;
    };

    const passwordIsValid = await verifyPassword(password, user.password);

    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ msg: "Please check your password properly" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET_III,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(200).json({ user: { id: user._id, name: user.name }, token });
  } catch (error) {
    res.status(500).json(error);
  }

  //res.send("<h1>The login route </h1>")
};

module.exports = { register, login };
