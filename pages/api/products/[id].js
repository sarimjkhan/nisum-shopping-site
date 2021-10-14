import db from '../../../utils/db';
import ProductModel from '../../../models/Product';

export default async function handler(req, res) {
  await db.connect();
  const product = await ProductModel.findById(req.query.id);
  await db.disconnect();
  res.status(200).json(product);
}
