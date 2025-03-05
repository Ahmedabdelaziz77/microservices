const express = require("express");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(express.json());

app.use("/app/pay-order", paymentRoutes);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Payment service is running on port ${PORT}`);
});
