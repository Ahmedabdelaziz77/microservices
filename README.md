# Microservices Architecture

This project is a microservices-based system consisting of four services:
![Image](https://github.com/user-attachments/assets/0cfc1e58-416a-4658-849e-3aa31b34c68b)

- **User Service**: Manages user registration, login, and user data.
- **Order Service**: Handles order creation and management.
- **Payment Service**: Processes payments using the Stripe API.
- **Notification Service**: Sends email notifications to users.

Each service is independent and interacts with others to provide a seamless user experience.

## System Overview

### Workflow

#### 1. User Registration and Login:
- A user signs up via the User Service and logs in.

#### 2. Order Creation:
- The user creates an order via the Order Service. The order is saved with a status of "Pending".

#### 3. Payment Processing:
- The user initiates payment via the Payment Service.
- The Payment Service fetches the order details from the Order Service.
- Payment is processed using the Stripe API.
- Once payment is successful, the Payment Service updates the order status to "Paid" in the Order Service.

#### 4. Notification Delivery:
- The Payment Service notifies the Notification Service about the successful payment.
- The Notification Service fetches the user's email from the User Service.
- An email is sent to the user via the Gmail API.

## Services

### 1. User Service
**Description**: Manages user registration, login, and user data.

**Database**: MongoDB

**Endpoints**:
- `POST /api/user`: Register a new user.
- `POST /api/login`: Authenticate a user and return a JWT token.
- `GET /api/user/{user_id}`: Fetch user details by ID.

### 2. Order Service
**Description**: Manages order creation and updates.

**Database**: SQLite

**Endpoints**:
- `POST /api/order`: Create a new order.
- `GET /api/order/{order_id}`: Fetch order details by ID.
- `PATCH /api/order/{order_id}`: Update order status (e.g., from "Pending" to "Paid").

### 3. Payment Service
**Description**: Handles payment processing using the Stripe API.

**Endpoints**:
- `POST /api/pay-order`: Initiate payment for an order.

**Interactions**:
- Fetches order details from the Order Service.
- Updates order status in the Order Service after successful payment.
- Notifies the Notification Service to send an email to the user.

### 4. Notification Service
**Description**: Sends email notifications to users.

**Endpoints**:
- `POST /api/notify`: Send an email notification to a user.

**Interactions**:
- Fetches user email from the User Service.
- Sends emails using the Gmail API.

## Technologies Used

- **Programming Language**: JavaScript (Node.js)
- **Frameworks**: Express.js
- **Databases**:
  - MongoDB (for User Service)
  - SQLite (for Order Service)
- **APIs**:
  - Stripe API (for Payment Service)
  - Gmail API (for Notification Service)
- **Environment Management**: dotenv

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (Node Package Manager)
- MongoDB (for User Service)
- SQLite (for Order Service)
- Stripe API key
- Gmail API credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ahmedabdelaziz77/microservices.git
cd microservices
```

2. Install dependencies for each service:
```bash
cd user-service && npm install
cd ../order-service && npm install
cd ../payment-service && npm install
cd ../notification-service && npm install
```

3. Set up environment variables:
   - Create a `.env` file in each service directory.
   - Add the required environment variables (e.g., `MONGO_URI`, `STRIPE_SECRET_KEY`, `EMAIL_USER`, `EMAIL_PASS`).

4. Start each service:
```bash
cd user-service && npm start
cd ../order-service && npm start
cd ../payment-service && npm start
cd ../notification-service && npm start
```

## API Documentation

### User Service
**Signup:**
```bash
POST /api/user
Body: { "username": "testuser", "email": "test@example.com", "password": "password123" }
```

**Login:**
```bash
POST /api/login
Body: { "email": "test@example.com", "password": "password123" }
```

### Order Service
**Create Order:**
```bash
POST /api/order
Body: { "user_id": "123", "product_name": "Laptop", "quantity": 1, "price": 1000 }
```

### Payment Service
**Pay Order:**
```bash
POST /api/pay-order
Body: { "order_id": "456" }
```

### Notification Service
**Notify User:**
```bash
POST /api/notify
Body: { "user_id": "123", "order_id": "456" }
```
