import { readCsvFile, writeCsvFile } from './csv.js';

const products = await readCsvFile('./products.csv');
const customers = await readCsvFile('./customers.csv');
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

const customerTotal = (customer) =>
  orders
    .filter((order) => order.customer === customer.id)
    .reduce((acc, order) => acc + totalOrderCost(order.products), 0);

const customerRanking = customers
  .map((customer) => ({ ...customer, total_euros: customerTotal(customer) }))
  .sort((a, b) => b.total_euros - a.total_euros);

writeCsvFile('./customer_ranking.csv', customerRanking);
