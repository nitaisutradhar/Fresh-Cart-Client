# 🛒 FreshCart - Local Market Price Tracker

FreshCart is a full-stack web application designed to track daily product prices in local markets. It empowers vendors to submit product prices, allows users to compare historical price trends, and enables secure purchasing using Stripe. Admins manage all activities through a powerful dashboard.

---

## 🔗 Live Demo

👉 [FreshCart Live Site](https://my-projects-2c6eb.web.app/)

---

## 🧩 Features

### 👥 Roles:
- **Admin:** Manage all products, users, ads, and orders.
- **Vendor:** Add market products, edit, and view their listings and ads.
- **User:** View products, add to watchlist, leave reviews, and purchase.

### 📦 Product Management
- Vendors can submit market products.
- Admins approve or reject products with feedback.
- Products are displayed publicly only after approval.

### 💬 Reviews
- Authenticated users can leave star ratings & reviews on products.

### 📈 Price Comparison
- Line charts (Recharts) show historical price changes.
- Users can compare by selecting different dates.

### ⭐ Watchlist
- Users can add products to their watchlist.
- View, manage, and delete items from the watchlist.

### 💳 Stripe Payment Integration
- Users can securely buy products through Stripe.
- Successful orders are saved to the database.

### 📢 Advertisement Management
- Vendors can create, edit, or delete ads.
- Admins can update or remove ads with full control.

### 🔐 Authentication & Authorization
- Firebase Auth (Email & Password)
- JWT-based route protection
- Custom `useRole()` and `useAuth()` hooks

---

## 🧰 Tech Stack

### Frontend:
- React.js + Vite
- Tailwind CSS
- Shadcn/ui
- Framer Motion (Animations)
- React Router
- React Query (TanStack)
- Axios
- Stripe Checkout
- Recharts (Price Chart)
- React Toastify (Notifications)
- React Hook Form + DatePicker

### Backend:
- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK
- JWT for secure APIs

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/freshcart.git
   cd freshcart
   ```
2. **Frontend Setup**

    Navigate to the `client/` directory and install the dependencies:

    ```bash
    cd client
    npm install
    npm run dev
    ```
    This will start your Vite + React development server on http://localhost:5173.

3. **Backend Setup**

    Navigate to the server/ directory and install backend dependencies:

    ```bash
    cd client
    npm install
    npm run dev 
    ```
    
    This will start your Express backend on http://localhost:5000.

4. **Environment Variables**

    ✅ Client-side (client/.env)
    ```env
    VITE_apiKey = 
    VITE_authDomain = 
    VITE_projectId = 
    VITE_storageBucket = 
    VITE_messagingSenderId = 
    VITE_appId = 

    VITE_IMGBB_API_KEY = 

    VITE_API_URL = http://localhost:5000

    VITE_STRIPE_PK_KEY = 
    ```

    ✅ Server-side (server/.env)

    ```env
    PORT=
    MONGODB_URI=
    JWT_SECRET_KEY = 
    STRIPE_SK_KEY = 
    ```
    ⚠️ Make sure to never commit .env files to version control!

    ---

## 🔐 Access Roles

| 🧑 Role     | Permissions                                                                                      |
|------------|---------------------------------------------------------------------------------------------------|
| 👑 **Admin**   | - View all products, ads, users, and orders<br>- Approve or reject vendor submissions<br>- Give rejection feedback<br>- Update/delete any product or ad<br>- Cannot change own role |
| 🧑‍🌾 **Vendor**  | - Submit products with price & image<br>- Submit advertisements<br>- View, update, or delete own products & ads |
| 🙋 **User**     | - Browse approved products<br>- Sort/filter by price or date<br>- View detailed product info<br>- Add to watchlist<br>- Buy via Stripe<br>- Leave reviews/comments<br>- Compare price trends |

> ✅ Roles are assigned during signup or by an Admin.
> 🔐 Role-based access is securely enforced on both client and server.

---

## 👨‍💻 Author

**Nitai Sutradhar**

- 🌐 [Portfolio](https://your-portfolio-url.com)
- 🐙 [GitHub](https://github.com/nitaisutradhar)
- 🔗 [LinkedIn](https://www.linkedin.com/in/nitai-chandra-sutradhar-a817481a7/)
 
 ---
 ## ⭐ Show Your Support

If you like this project:

- ⭐ Star this repo
- 🔁 Fork and customize it
- 🧑‍💻 Connect with me

Thanks for visiting! 🙌

---