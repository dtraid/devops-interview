import { readCsvFile } from './csv.js';

const customers = await readCsvFile('./files/customers.csv');
const rawProducts = await readCsvFile('./files/products.csv');
const rawOrders = await readCsvFile('./files/orders.csv');

// Convert cost to Number
const products = rawProducts.map((product) => ({ ...product, cost: parseFloat(product.cost) }));

// Convert space-separated product ids to array of product ids
const orders = rawOrders.map((order) => ({
  ...order,
  products: order.products.split(/\s+/),
}));

// Find product by id
const getProduct = (productId) => products.find((product) => product.id === productId);

// Get price of a product
const getPrice = (productId) => getProduct(productId).cost;

// Calculate the cost of a list of products
const getProductsCost = (productIdsArr) =>
  productIdsArr.reduce((totalCost, productId) => totalCost + getPrice(productId), 0);

// Calculate the cost of all orders (task 1)
const listOrderCosts = orders.map((order) => ({
  id: order.id,
  euros: getProductsCost(order.products),
}));

// Find all the customers that have purchased a specific product
const getCustomersByProduct = (productId) =>
  orders.reduce(
    (customers, order) =>
      order.products.includes(productId) ? customers.add(order.customer) : customers,
    new Set()
  );

// List customers that have purchased each product
const listCustomersByProduct = products.map((product) => ({
  id: product.id,
  customer_ids: [...getCustomersByProduct(product.id)].join(' '),
}));

// Calculate the total spending of a customer
const getCustomerTotal = (customer) =>
  orders
    .filter((order) => order.customer === customer.id)
    .reduce((acc, order) => acc + getProductsCost(order.products), 0);

// Rank customers by spending (task 3)
const listCustomerRanking = customers
  .map((customer) => ({ ...customer, total_euros: getCustomerTotal(customer) }))
  .sort((a, b) => b.total_euros - a.total_euros);

export { listOrderCosts, listCustomersByProduct, listCustomerRanking };
