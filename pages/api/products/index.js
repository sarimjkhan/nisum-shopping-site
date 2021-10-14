import db from '../../../utils/db';
import ProductModel from '../../../models/Product';

export default async function handler(req, res) {
  await db.connect();
  const productsList = await ProductModel.find({});
  await db.disconnect();
  res.status(200).json(productsList);
}
