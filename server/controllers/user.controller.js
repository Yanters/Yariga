import User from '../mongodb/models/user.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().limit(req.query._end);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

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

const getUserInfoById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('allProperties');

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllUsers, createUser, getUserInfoById };
