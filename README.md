# 🛍️ E-commerce Websites

Welcome! This is the source code repository for **OnPapier** and ,a custom-built freelance e-commerce websites crafted with love, React, and a focus on performance and user experience.

🔗 **Live Projects**
- [OnPapier - LIVE](https://www.onpapier.com/)
---

## 🤔 What’s Inside?

This is a full-stack web application designed for small business owners looking to sell their products online. It includes everything from secure payment integration to admin tools for product and order management.

---

## 🧱INFRASTRUCTURE

![Architecture review (4)](https://github.com/user-attachments/assets/be8ff129-b8e6-4518-920e-7c8dae2edc1c)


---

## 🧱 Tech Stack

### Frontend
- **React**
- **Tailwind CSS**
- **JavaScript**
- **Vercel** (Deployment)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Firebase** (for media and user handling)
- **Cloudinary** (image storage)
- **Multer** (file upload)

### APIs & Integrations
- **Stripe** and **PayPal** – secure online payments
- **JWT Authentication** – secure user sessions
- **Multer + Cloudinary** – file/image uploads
- **Firebase Auth & Firestore** – user management and storage
- **Cloudflare** – bot protection & enhanced performance
---

## 🛠️ Key Features

- 🔐 **User Authentication** (JWT)
- 🛒 **Add to Cart, Checkout, and Payment**
- 💳 **Secure Payments** with Stripe & PayPal
- 📦 **Admin Dashboard** to manage:
  - Products
  - Orders
  - Customers
- 📁 **File Uploads** with Cloudinary + Multer
- 🌐 **Cloudflare Integration** for DDoS mitigation and bot protection
- 📱 **Fully Responsive** for mobile, tablet, and desktop
- 📊 **Order Tracking** & Status Management
- 🔄 **Real-time Updates** (on Firebase-enabled apps)

---

## 📦 Setup Instructions

### 🔧 Development

Clone the repo and install dependencies:

```bash
git clone https://github.com/hanskkangg/E-Com.git
cd E-come
```

Start development servers:

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
You can now run the backend using Docker Compose:
```bash
cd ~
docker-compose up --build
```

#### Admin Panel
```bash
cd admin
npm install
npm run dev
```

Make sure to add your `.env` files with keys for:
- MongoDB
- Firebase
- Stripe / PayPal
- Cloudinary

### 🚀 Deployment

This app is pre-configured for deployment on **Vercel**. Just push to GitHub and link your repo with Vercel for automatic CI/CD.

---


## 🙋‍♂️ About Me

👋 I'm Hans Kang, a full-stack developer passionate about building scalable web apps and automating business processes.  
🔗 [Personal Portfolio](https://hanskang.com)  
📫 [LinkedIn](https://www.linkedin.com/in/hanskkang)

---

