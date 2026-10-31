# 🔗 LinkShort – URL Shortener

A modern, full-stack URL shortener built with **React, Node.js, Express.js, and MongoDB**. LinkShort allows users to convert long URLs into short, shareable links and manage their shortened URLs through a user-friendly dashboard.

## 🚀 Features

- **URL Shortening:** Convert long URLs into short, shareable links.
- **User Authentication:** Register, log in, and securely manage your account.
- **Dashboard:** View and manage your shortened URLs.
- **Link Management:** Copy, open, and manage shortened links.
- **Analytics:** Track clicks and view URL visit history.
- **User Profile:** View and manage profile information.
- **Settings:** Account and application settings.
- **Support System:** Submit support requests.
- **Email Integration:** Send support-related emails using Nodemailer.
- **Responsive Design:** Clean interface for desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Nanoid
- Nodemailer

## 📁 Project Structure

```text
URL-Shortner/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── index.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd URL-Shortner
```

### 2. Setup the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
SUPPORT_EMAIL=your_email@gmail.com
```

Start the backend:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:8000
```

### 3. Setup the frontend

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` folder:

```env
VITE_API_URL=http://localhost:8000
VITE_PUBLIC_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

Open the local development URL displayed by Vite, usually:

```text
http://localhost:5173
```

## 🔌 API Endpoints

The following are the main API routes used by the application.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register` | Register a new user |
| POST | `/api/users/login` | Log in a user |
| GET | `/api/users/me` | Get authenticated user |
| POST | `/url` | Generate a short URL |
| GET | `/url/analytics/:shortId` | Get URL analytics |
| GET | `/:shortId` | Redirect to original URL |
| POST | `/api/support/tickets` | Create a support ticket |
| GET | `/api/support/my-tickets` | Get user's support tickets |

*Some additional endpoints may be added as the project develops.*

## 🔐 Environment Variables

Never upload your `.env` files or expose your credentials on GitHub.

Add the following to your `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
.DS_Store
```

Use placeholder values in `.env.example` files instead of real credentials.

## 🌐 Deployment

The application can be deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

Remember to configure production environment variables and CORS before deployment.

## 📸 Screenshots

Add screenshots of your application here to showcase its interface.

Suggested screenshots:

- Landing Page
- Login and Registration
- Dashboard
- My Links
- Analytics
- Profile and Settings
- Support Page

Example:

```markdown
![Dashboard](screenshots/dashboard.png)
```

## 🔮 Future Improvements

- QR code generation for shortened URLs.
- Custom short URL aliases.
- Link expiration functionality.
- Advanced analytics and visual charts.
- User-specific URL management.
- Improved password recovery.
- Link sharing and export functionality.

## 👨‍💻 Author

**Your Name**

- GitHub: [Your GitHub Profile](https://github.com/YOUR_GITHUB_USERNAME)
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME/)

## 📄 License

This project is licensed under the MIT License.

---

⭐ If you like this project, consider giving it a star on GitHub!

**Built with ❤️ using the MERN stack.**
