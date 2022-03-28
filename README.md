# DevOps interview

## Requisites

- Computer
- Keyboard
- [Node.js](https://nodejs.org/)

## Usage

Clone the repository and run the project:

```bash
git clone https://github.com/dtraid/devops-interview.git
cd devops-interview
node .
```

## CSV files

All files are inside the `files` directory.

### Input files

1. **`customers.csv`** keeps customer information:
   - `id`: numeric customer id.
   - `firstname`: customer's first name.
   - `lastname`: customer's last name.
2. **`products.csv`** keeps product info:
   - `id`: numeric product id.
   - `name`: human-readable name.
   - `cost`: product cost in euros.
3. **`orders.csv`** keeps order information:
   - `id`: numeric order id.
   - `customer`: numeric id of the customer who created the order.
   - `products`: space-separated list of product ids ordered by the customer.

### Output files

1. **`order_prices.csv`** lists the total cost of each order:
   - `id`: numeric id of the order.
   - `euros`: total cost of the order.
2. **`product_customers.csv`** lists all the customers that have purchased each product:
   - `id`: numeric product id.
   - `customer_ids`: space-separated list of customer ids of the customers who have purchased this product.
3. **`customer_ranking.csv`** ranks customers by their lifetime spending:
   - `id`: numeric id of the customer
   - `firstname`: customer first name
   - `lastname`: customer last name
   - `total_euros`: total euros this customer has spent on products
