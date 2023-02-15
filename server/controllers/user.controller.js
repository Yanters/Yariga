import User from '../mongodb/models/user.js';

const getAllUsers = async (req, res) => {};

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, avatar } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(200).json(userExists);

    const user = await User.create({ name, email, avatar });
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserInfoById = async (req, res) => {};

export { getAllUsers, createUser, getUserInfoById };
