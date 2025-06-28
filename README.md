# E-Commerce Skincare Website

🛍️ A responsive skincare e-commerce website built using ReactJS, HTML, CSS, and JavaScript.

## Features
- Product showcase
- Routing with React Router
- Modern UI with CSS
- Responsive design
- Add to Cart option

## Tech Stack
- React
- JavaScript, HTML, CSS

## Getting Started

ADDED VERSION 

A full-stack e-commerce application built with React frontend and Node.js backend, featuring user authentication, product management, and shopping cart functionality.

## ✨ Features

### 🛍️ E-commerce Features
- **Product Catalog**: Browse beauty products with categories and filtering
- **Shopping Cart**: Add/remove items, update quantities, and view cart total
- **User Authentication**: Secure login/register system with JWT tokens
- **User Profiles**: Manage account information and view order history
- **Responsive Design**: Mobile-friendly interface with modern CSS styling

### 🎨 Frontend (React)
- **React Router**: Client-side routing for seamless navigation
- **Context API**: State management for authentication and cart
- **Responsive UI**: CSS Grid and Flexbox for modern layout
  
### 🔧 Backend (Node.js/Express)
- **RESTful API**: Complete CRUD operations for products, users, and orders
- **JWT Authentication**: Secure user sessions with JSON Web Tokens
- **Password Hashing**: bcrypt encryption for user security
- **JSON Data Storage**: File-based data persistence (ready for MongoDB migration)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ecommerce-static
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../glownest
   npm install
   ```

4. **Set up Environment Variables**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

5. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   Server will run on: http://localhost:5000

6. **Start the Frontend Application**
   ```bash
   cd glownest
   npm start
   ```
   App will run on: http://localhost:3000

## 📁 Project Structure

```
ecommerce-static/
├── backend/                 # Node.js/Express API
│   ├── data/               # JSON data files
│   │   ├── products.json   # Product catalog
│   │   ├── users.json      # User accounts
│   │   └── cart.json       # Shopping cart data
│   ├── routes/             # API route handlers
│   │   ├── products.js     # Product endpoints
│   │   ├── users.js        # User authentication
│   │   ├── cart.js         # Cart operations
│   │   └── orders.js       # Order management
│   ├── server.js           # Express server setup
│   └── package.json        # Backend dependencies
├── glownest/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Navbar.js   # Navigation component
│   │   │   └── ProductCard.js # Product display
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js     # Landing page
│   │   │   ├── Products.js # Product catalog
│   │   │   ├── Cart.js     # Shopping cart
│   │   │   ├── Login.js    # User login
│   │   │   ├── Register.js # User registration
│   │   │   └── Profile.js  # User profile
│   │   ├── context/        # React Context providers
│   │   │   ├── AuthContext.js # Authentication state
│   │   │   └── CartContext.js # Cart state
│   │   ├── services/       # API service functions
│   │   │   └── api.js      # HTTP requests
│   │   ├── images/         # Product images
│   │   ├── App.js          # Main app component
│   │   └── index.css       # Global styles
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove item from cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:userId` - Get user's orders


## 🛠️ Development


**Backend:**
```bash
npm start          # Start development server
npm run dev        # Start with nodemon (if configured)
```

**Frontend:**
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## 🔄 Future Enhancements

- [ ] MongoDB integration for scalable data storage
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications for orders
- [ ] Product reviews and ratings
- [ ] Wishlist functionality



**Built using React, Node.js, and Express**

