const stripe = require("stripe")(
  require("../config/envConfig").stripeSecretKey
);

class StripeService {
  static async createPaymentIntent(amount, currency, description, metadata) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency,
        description,
        payment_method_types: ["card"],
        metadata,
      });
      return paymentIntent;
    } catch (error) {
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
  }
}

module.exports = StripeService;
