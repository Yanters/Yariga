import Property from '../mongodb/models/property.js';
import User from '../mongodb/models/user.js';

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProperties = async (req, res) => {
  const {
    _start,
    _end,
    _order,
    _sort,
    title_like = '',
    propertyType = '',
  } = req.query;

  const query = {};

  if (propertyType !== '') query.propertyType = propertyType;

  if (title_like !== '') query.title = { $regex: title_like, $options: 'i' };

  try {
    const count = await Property.countDocuments({ query });

    const properties = await Property.find(query)
      .limit(_end)
      .skip(_start)
      .sort({
        [_sort]: _order,
      });

    res.header('X-Total-Count', count);
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');

    res.status(200).json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getPropertyDetail = async (req, res) => {};

const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;

    // Start a new transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error('User not found');

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newProperty = await Property.create({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allProperties.push(newProperty._id);
    console.log('User updated');
    await user.save({ session });
    console.log('User saved');
    await session.commitTransaction();
    console.log('Transaction committed');

    res.status(200).json({ message: 'Property created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateProperty = async (req, res) => {};
const deleteProperty = async (req, res) => {};

export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty,
};
