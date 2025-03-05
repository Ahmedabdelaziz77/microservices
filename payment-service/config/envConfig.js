if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in the environment variables.");
}

module.exports = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
};
