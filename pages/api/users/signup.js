import db from '../../../utils/db';
import UserModel from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

function signToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    'nisumshopsecret',
    {
      expiresIn: '10d',
    }
  );
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await db.connect();
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
      isAdmin: false,
    });
    const createdUser = user.save();
    await db.disconnect();

    const token = signToken(user);
    res.status(200).json({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
}
