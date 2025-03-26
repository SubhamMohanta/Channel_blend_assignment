# 🛒 **Product Web Application**

An interactive product-web application where users can explore products, view product details, and manage their cart. This project is built using **React** for the frontend, **Node.js** with **Express** for the backend, and **MongoDB** for data management.

## 🚀 **Features**

- Browse a collection of products using a grid layout.
- View detailed product information in a modal.
- Add products to the shopping bag.
- Update product quantities or remove them from the bag.
- View the total price of products in the bag.
- Simple and clean UI with smooth animations using **Framer Motion**.

## 🛠️ **Tech Stack**

**Frontend:**

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Framer Motion

**Backend:**

- Node.js
- Express
- MongoDB
- Mongoose

**State Management:**

- React Context API

## ⚙️ **Getting Started**

Follow the steps below to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- Node.js (v18+)
- npm or yarn
- MongoDB (local or cloud)

### 📦 **Backend Setup**

1. Clone the repository:

   ```bash
   git clone https://github.com/SubhamMohanta/Channel_blend_assignment.git
   cd ./Channel_blend_assignment
   ```

2. Navigate to the server directory:

   ```bash
   cd ./server
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Configure environment variables:  
   Create a `.env` file in the `server` directory:  
    `env
    mongodb+srv://<username>:<password>@<cluster-address>/<database-name>
    `

5. Start the server:  
    `bash
    npx ts-node src/index.ts
    `
   Server will be available at `http://localhost:5000`.

### 🖼️ **Frontend Setup**

1. Navigate to the client directory:

   ```bash
   cd ./client
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the frontend server:  
    `bash
    npm run dev
    `
   Frontend will be available at `http://localhost:5173`.

## 🧑‍💻 **Project Structure**

```bash
Channel_blend_assignment
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   └── pages
│   └── App.tsx
├── server
│   ├── src
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   ├── types
│   │   └── index.ts
└──────.env
```

## 📖 **Design Choices**

1. **Component-Driven UI:**

   - Reusable UI components (`ProductDetail`, `CartItem`, `NavBar`) ensure better code maintainability.

2. **State Management:**

   - React Context API with useReducer is used for managing bag state for simplicity and clarity.

3. **Database Management:**

   - MongoDB stores product information and handles data persistence.

4. **Animation:**
   - Framer Motion is used for smooth animations and transitions.

## 🧗 **Challenges and Solutions**

1. **CORS Issues:**

   - Faced CORS issues during API requests.
   - **Solution:** Added CORS middleware in the backend.

2. **MongoDB Connection:**
   - Faced connection issues during initial setup.
   - **Solution:** Checked `.env` variables and ensured MongoDB was running using logs.

## 🏆 **Bonus Features**

- **Backend integration:** Fetch product data dynamically from my custom API.

---

## 🚦 **API Endpoints**

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| `GET`  | `/api/products` | Get all products |
