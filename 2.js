import { readCsvFile, writeCsvFile } from './libs/csv.js';

const products = await readCsvFile('./products.csv');
const rawOrders = await readCsvFile('./orders.csv');

const orders = rawOrders.map((order) => ({
  ...order,
  products: order.products.split(/\s+/),
}));

const productCustomers = products.map((product) => {
  const customerIds = orders.reduce(
    (acc, order) => (order.products.includes(product.id) ? acc.add(order.customer) : acc),
    new Set()
  );

  return { id: product.id, customer_ids: [...customerIds].join(' ') };
});

writeCsvFile('./product_customers.csv', productCustomers);
