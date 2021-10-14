import db from '../../../utils/db';
import OrderModel from '../../../models/Order';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await db.connect();
    const order = new OrderModel({
      ...req.body,
    });
    const newOrder = await order.save();
    await db.disconnect();
    res.status(200).json(newOrder);
  }
}
