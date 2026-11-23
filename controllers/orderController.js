
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

Order.belongsTo(Product, { foreignKey: 'productId' });
Order.belongsTo(User, { foreignKey: 'userId' });

exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity, address, phone } = req.body;
    const order = await Order.create({
      userId: req.user.id,
      productId,
      quantity,
      address,
      phone
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.findAll({
    where: { userId: req.user.id },
    include: [Product],
    order: [['id', 'DESC']]
  });
  res.json(orders);
};

// للأدمن: جلب جميع طلبيات كل المستخدمين
exports.getAllOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: [Product, User],
    order: [['id', 'DESC']]
  });
  res.json(orders);
};

// للأدمن: تحديث حالة الطلبية
exports.updateOrderStatus = async (req, res) => {
  await Order.update({ status: req.body.status }, { where: { id: req.params.id } });
  res.json({ message: 'Order status updated' });
};

// للمستخدم: إلغاء وحذف طلبيته
exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.destroy({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (!deleted) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order cancelled and deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
