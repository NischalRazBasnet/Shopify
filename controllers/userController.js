import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExist = await User.findOne({ email: email });
    if (!isExist)
      return res.status(409).json({ message: 'Email doesnot Exist' });
    const pass = bcrypt.compareSync(password, isExist.password);
    if (!pass)
      return res.status(401).json({ message: 'Invalid Id or Password' });
    const token = jwt.sign({ id: isExist._id, role: isExist.role }, 'secret');
    return res.status(200).json({
      token,
      id: isExist.id,
      username: isExist.username,
      email: isExist.email,
      role: isExist.role,
    });
  } catch (err) {}
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const isExist = await User.findOne({ email: email });
    if (isExist)
      return res.status(409).json({ message: 'Email Already Exist' });
    const hashPass = bcrypt.hashSync(password, 10);
    await User.create({ username, email, password: hashPass });
    return res.status(200).json({ message: 'User Registered Successfully' });
  } catch (err) {
    return res.status(400).json({ message: `${err}` });
  }
};
