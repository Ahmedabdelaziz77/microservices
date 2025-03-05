if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error(
    "Email credentials are not set in the environment variables."
  );
}

module.exports = {
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
};
