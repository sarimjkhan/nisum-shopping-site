import db from '../../utils/db';
import ProductModel from '../../models/Product';
import data from '../../utils/data';
import UserModel from '../../models/User';

export default async function (req, res) {
  await db.connect();
  await UserModel.deleteMany();
  await UserModel.insertMany(data.users);
  await ProductModel.deleteMany();
  await ProductModel.insertMany(data.products);
  await db.disconnect();
  res.status(200).json({ message: 'Successfully populated data' });
}
