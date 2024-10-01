import { NextApiRequest, NextApiResponse } from 'next';
import { authorizeRoles, isAuthenticated } from '../../../middleware';
import Category from '../../../models/category';
import connectDB from './../../../libs/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB(handler);

  const user = await isAuthenticated(req, res);
  if (!user) return res.status(401).json({ msg: 'Unauthorized' });

  const isAuthorize = await authorizeRoles(user._id, res, 'admin');
  if (!isAuthorize) return res.status(403).json({ msg: 'Forbidden' });

  switch (req.method) {
    case 'POST':
      const { name, image } = req.body;
      if (!name || !image) {
        return res.status(400).json({ msg: 'Please provide category name and image.' });
      }

      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ msg: `${name} category already exists.` });
      }

      const newCategory = new Category({ name, image });
      await newCategory.save();

      return res.status(201).json({
        msg: `${name} category has been created successfully.`,
        category: newCategory,
      });

    case 'GET':
      // Retrieve categories with pagination
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 6;
      const skip = (page - 1) * limit;

      const categories = await Category.find().sort('-createdAt').skip(skip).limit(limit);
      const totalCategories = await Category.countDocuments();

      const totalPage = totalCategories ? Math.ceil(totalCategories / limit) : 0;

      return res.status(200).json({ categories, totalPage });

    default:
      return res.status(405).json({ msg: `${req.method} method is not allowed for this endpoint.` });
  }
};

export default handler;


