import { NextApiRequest, NextApiResponse } from 'next';
import { validateEmail } from '../../../utils/validate';
import bcrypt from 'bcrypt';
import User from '../../../models/user';
import connectDB from '../../../libs/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ msg: `${req.method} method not allowed for this endpoint.` });
  }

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please provide name, email, and password for registration.' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ msg: 'Please provide a valid email address.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ msg: 'Password should be at least 8 characters.' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: `${email} is already registered.` });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    isActive: true, 
  });

  await newUser.save();

  return res.status(201).json({
    msg: 'Registration successful. Your account is active.',
    user: { name, email, role },
  });
};

export default connectDB(handler);
