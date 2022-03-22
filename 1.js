import { readCsvFile, writeCsvFile } from './libs/csv.js';

const products = await readCsvFile('./products.csv');
const rawOrders = await readCsvFile('./orders.csv');

const orders = rawOrders.map((order) => ({
  ...order,
  products: order.products.split(/\s+/),
}));

const totalOrderCost = (productIds) =>
  productIds.reduce((acc, productId) => {
    const price = products.find((product) => product.id === productId).cost;

    return acc + parseFloat(price);
  }, 0);

const orderCosts = orders.map((order) => ({
  id: order.id,
  euros: totalOrderCost(order.products),
}));

writeCsvFile('./order_costs.csv', orderCosts);
