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
    const user = await UserModel.findOne({ email: req.body.email });
    await db.disconnect();
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = signToken(user);
      res.status(200).json({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401).json({ message: 'Invalid email and/or password' });
    }
  }
}
