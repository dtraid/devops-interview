// customers: { id:string, firstname:string, lastname:string }
// orders: { id:string, customer:string, products:number[] }
// products: { id:string, name:string, cost:number }

// Find product by id
const getProduct = (productId, products) => products.find((product) => product.id === productId);

// Get price of a product
const getPrice = (productId, products) => getProduct(productId, products).cost;

// Calculate the cost of a list of products
const getProductsCost = (productIdsArr, products) =>
  productIdsArr.reduce((totalCost, productId) => totalCost + getPrice(productId, products), 0);

// Calculate the cost of all orders (task 1)
const listOrderCosts = ({ products, orders }) =>
  orders.map((order) => ({
    id: order.id,
    euros: getProductsCost(order.products, products),
  }));

// Find all the customers that have purchased a specific product
const getCustomersByProduct = (productId, orders) =>
  orders.reduce(
    (customers, order) =>
      order.products.includes(productId) && !customers.includes(order.customer)
        ? [...customers, order.customer]
        : customers,
    []
  );

// List customers that have purchased each product (task 2)
const listCustomersByProduct = ({ orders, products }) =>
  products.map((product) => ({
    id: product.id,
    customer_ids: [...getCustomersByProduct(product.id, orders)].join(' '),
  }));

// Calculate the total spending of a customer
const getCustomerTotal = (customer, { orders, products }) =>
  orders
    .filter((order) => order.customer === customer.id)
    .reduce((acc, order) => acc + getProductsCost(order.products, products), 0);

// Rank customers by spending (task 3)
const listCustomerRanking = ({ customers, orders, products }) =>
  customers
    .map((customer) => ({
      ...customer,
      total_euros: getCustomerTotal(customer, { orders, products }),
    }))
    .sort((a, b) => b.total_euros - a.total_euros);

export { listOrderCosts, listCustomersByProduct, listCustomerRanking };
