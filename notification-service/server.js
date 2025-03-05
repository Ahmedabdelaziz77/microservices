const express = require("express");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
app.use(express.json());

app.use("/api/notify", notificationRoutes);

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Notification service is running on port ${PORT}`);
});
