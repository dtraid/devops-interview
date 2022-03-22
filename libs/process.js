import { readCsvFile } from './csv.js';

const customers = await readCsvFile('./files/customers.csv');
const rawProducts = await readCsvFile('./files/products.csv');
const rawOrders = await readCsvFile('./files/orders.csv');

const products = rawProducts.map((product) => ({ ...product, cost: parseFloat(product.cost) }));

const orders = rawOrders.map((order) => ({
  ...order,
  products: order.products.split(/\s+/),
}));

const findProduct = (productId) => products.find((product) => product.id === productId);
const productPrice = (productId) => findProduct(productId).cost;
const productsCost = (productIds) =>
  productIds.reduce((totalCost, productId) => totalCost + productPrice(productId), 0);

// Task 2
const orderCosts = orders.map((order) => ({
  id: order.id,
  euros: productsCost(order.products),
}));

const productCustomers = products.map((product) => {
  const customerIds = orders.reduce(
    (acc, order) => (order.products.includes(product.id) ? acc.add(order.customer) : acc),
    new Set()
  );

  return { id: product.id, customer_ids: [...customerIds].join(' ') };
});

const customerTotal = (customer) =>
  orders
    .filter((order) => order.customer === customer.id)
    .reduce((acc, order) => acc + orderCost(order.products), 0);

const customerRanking = customers
  .map((customer) => ({ ...customer, total_euros: customerTotal(customer) }))
  .sort((a, b) => b.total_euros - a.total_euros);

export { orderCosts, productCustomers, customerRanking };
