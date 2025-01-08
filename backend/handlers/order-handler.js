const Order = require('../db/order')

async function addOrder(userId, order) {
  let orders = new Order({
    ...order,
    userId: userId, 
    status: "inprogress"
  });
  await orders.save();
}

async function getCustomerOrders(userId) {
  let orders = await Order.find({userId: userId});
  return orders.map((x) => x.toObject());
}



module.exports = {addOrder, getCustomerOrders}