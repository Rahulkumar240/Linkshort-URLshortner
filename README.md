# URL_Shortner
A scalable URL Shortener built with Node.js, Express.js, MongoDB, and NanoID that generates unique short links, performs instant redirection, and tracks click analytics with visit history using a clean MVC architecture.

> A high-performance backend application that transforms lengthy URLs into compact, shareable links while tracking usage analytics such as click counts and visit history.

Built using **Node.js**, **Express.js**, **MongoDB**, and **NanoID**, this project demonstrates the design of a real-world URL shortening service inspired by platforms like **Bitly** and **TinyURL**.

---

# 📖 Overview

Long URLs are difficult to share, visually cluttered, and often contain unnecessary query parameters that reduce readability.

This application solves that problem by generating a unique short identifier for every valid URL using **NanoID**, storing the mapping inside **MongoDB**, and instantly redirecting users to the original destination whenever the shortened link is accessed.

Beyond URL shortening, the application records user interactions by maintaining click analytics and visit timestamps, providing useful insights into link usage.

---

# 🎯 Problem Statement

Consider the following URL:

```
https://www.example.com/products/electronics/mobile/samsung-s25-ultra?campaign=summer-sale&utm_source=newsletter
```

Problems with such URLs include:

- Difficult to remember
- Hard to share
- Poor readability
- Higher chance of copy errors
- Unsuitable for social media and messaging platforms

Modern applications require shorter, cleaner links that remain reliable while providing insight into how frequently they are used.

---

# 💡 Solution

The application generates a unique **NanoID** for every submitted URL.

Each generated identifier is mapped to its corresponding original URL inside MongoDB.

Whenever the shortened URL is accessed:

1. The server locates the corresponding document.
2. Records the visit timestamp.
3. Updates the click analytics.
4. Redirects the user to the original destination.

This creates a lightweight yet scalable URL shortening service capable of storing both URL mappings and usage statistics.

---

# ✨ Features

- Generate short URLs using **NanoID**
- Instant HTTP redirection
- URL analytics
- Click count tracking
- Visit timestamp history
- RESTful API design
- Modular MVC architecture
- MongoDB integration using Mongoose
- Organized backend structure

---

# 🏗 System Architecture

```
                Client
                   │
                   ▼
         Express REST API
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
URL Generation         URL Redirection
        │                     │
        ▼                     ▼
 Generate NanoID      Find Original URL
        │                     │
        ▼                     ▼
 Store in MongoDB    Update Analytics
        │                     │
        └──────────┬──────────┘
                   ▼
           Redirect User
```

---

# ⚙️ Project Workflow

```
User submits URL
        │
        ▼
Validate Request
        │
        ▼
Generate NanoID
        │
        ▼
Store URL Mapping
        │
        ▼
Return Short URL
        │
        ▼
User visits Short URL
        │
        ▼
Lookup Original URL
        │
        ▼
Increment Click Count
        │
        ▼
Store Visit Timestamp
        │
        ▼
Redirect User
```

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Backend framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | Object Data Modeling (ODM) |
| **NanoID** | Secure unique short ID generation |
| **Git & GitHub** | Version control |

---

# 📂 Project Structure

```
URL-SHORTENER/
│
├── controllers/
│      Handles business logic
│
├── models/
│      MongoDB schema definitions
│
├── routes/
│      API endpoint definitions
│
├── connect.js
│      Database connection
│
├── index.js
│      Application entry point
│
├── package.json
│
└── .gitignore
```

The project follows the **MVC (Model-View-Controller)** architecture, ensuring a clear separation of concerns and improving maintainability as the application grows.

---

# 📡 API Endpoints

## Create Short URL

```
POST /url
```

Request

```json
{
    "url":"https://www.google.com"
}
```

Returns

```json
{
    "id":"abc123"
}
```

---

## Redirect

```
GET /:shortId
```

Redirects the client to the original URL while recording analytics.

---

## View Analytics

```
GET /analytics/:shortId
```

Returns

- Original URL
- Short ID
- Total Clicks
- Visit Timestamp History

---

# ⚡ Optimization & Design Decisions

The application incorporates several design decisions aimed at improving maintainability and efficiency.

### Efficient Identifier Generation

Instead of sequential IDs, the application uses **NanoID**, a secure and collision-resistant identifier generator that produces compact unique IDs suitable for URL shortening.

### Modular Architecture

The codebase follows the MVC pattern, separating routing, business logic, and database operations, making future enhancements easier.

### Lightweight Database Queries

MongoDB stores only the essential URL mapping and analytics information, allowing quick document retrieval and updates during redirection.

### Analytics Collection

Each redirect updates:

- Total click count
- Visit timestamps

This enables usage tracking without requiring complex data processing.

---

# 🌟 Why This Project Stands Out

Unlike a basic CRUD application, this project demonstrates concepts commonly found in production backend systems.

It showcases:

- REST API Development
- URL Mapping
- HTTP Redirection
- Backend Routing
- Database Design
- Analytics Collection
- Scalable MVC Architecture
- Secure Unique ID Generation using NanoID
- MongoDB Data Modeling

The project combines backend engineering principles with a practical real-world use case, providing hands-on experience in designing scalable web services.

---

# 🧠 Challenges Solved

- Designing collision-resistant short URLs
- Mapping short identifiers to original URLs efficiently
- Recording analytics during every redirect
- Maintaining a clean and modular project structure
- Separating application logic from routing and database operations

---

# 📚 Key Learnings

Through this project, I gained practical experience in:

- Building REST APIs using Express.js
- Integrating MongoDB with Mongoose
- Designing scalable backend architecture
- Using NanoID for secure identifier generation
- Implementing HTTP redirection
- Tracking application analytics
- Structuring backend projects using MVC principles

---

# ▶️ Getting Started

Clone the repository

```bash
git clone https://github.com/your-username/url-shortener.git
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm start
```

Server runs on

```
http://localhost:8000
```

---

# 📌 Repository Highlights

- ✔ Production-inspired backend architecture
- ✔ Secure short URL generation using NanoID
- ✔ Click analytics with visit history
- ✔ RESTful API implementation
- ✔ Modular MVC design
- ✔ Clean, maintainable codebase

---

## 👨‍💻 Author

**Rahul Kumar**

Bachelor of Technology (Computer Science & Engineering)

Passionate about Backend Development, Problem Solving, and Scalable System Design.
