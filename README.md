# Real Estate Management System - Backend

## Overview
This is the backend for the Real Estate Management System, built using Node.js, Express, and MongoDB. It handles user management, property listings, leases, payments, maintenance requests, and tenant information.

## Features
- User authentication and authorization using JWT
- Property management (CRUD operations)
- Lease and tenant management
- Payment processing and tracking
- Maintenance request handling
- Email notifications with Nodemailer

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Email Service**: Nodemailer

## Folder Structure
```
server/
│── controllers/
│   ├── public/
│   ├── user/
│   ├── property/
│   ├── tenant/
│   ├── payment/
│   ├── maintenance/
│   ├── lease/
│
│── middlewares/
│   ├── auth.js
│
│── models/
│   ├── User.js
│   ├── Property.js
│   ├── Lease.js
│   ├── Maintenance.js
│
│── utils/
│   ├── dbConnect.js
│   ├── sendEmail.js
│
│── server.js
│── .env
│── package.json
```

## Installation
### Prerequisites
- Node.js installed
- MongoDB running

### Steps
1. Clone the repository:
   ```sh
   git clone git@github.com:syedomer17/Real-Estate-Property-Management-System-MERN.git
   cd Real-Estate-Property-Management-System-MERN
   ```
2. Install dependencies:
   ```sh
   cd server
   npm install
   ```
3. Create a `config` folder in the root directory and then make a file `default.json` and add the following variables:
   ```config
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```
4. Start the server:
   ```sh
   cd server 
   npm start
   ```

## API Endpoints
### User Authentication
- `POST /api/users/signup` - Register a new user
- `POST /api/users/signin` - Login user

### Property Management
- `GET /api/properties/` - Get all properties
- `POST /api/properties/` - Create a new property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Lease & Tenant Management
- `GET /api/leases/` - Get all leases
- `POST /api/leases/` - Create a new lease
- `GET /api/tenants/` - Get all tenants

### Payments
- `POST /api/payments/` - Create a new payment
- `GET /api/payments/` - Get all payments

### Maintenance Requests
- `POST /api/maintenance/` - Create a maintenance request
- `GET /api/maintenance/` - Get all maintenance requests

## License
This project is licensed under the MIT License.

## Author
- **syedomer17** - [GitHub](https://github.com/syedomer17)
