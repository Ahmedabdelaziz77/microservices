const db = require("../config/db");

const createOrder = (user_id, product_name, quantity, price, callback) => {
  db.run(
    "INSERT INTO orders (user_id, product_name, quantity, price) VALUES (?, ?, ?, ?)",
    [user_id, product_name, quantity, price],
    function (err) {
      callback(err, this?.lastID);
    }
  );
};

const getOrderById = (id, callback) => {
  db.get("SELECT * FROM orders WHERE id = ?", [id], callback);
};

const updateOrderStatus = (id, callback) => {
  db.run("UPDATE orders SET status = 'Paid' WHERE id = ?", [id], callback);
};

module.exports = { createOrder, getOrderById, updateOrderStatus };
