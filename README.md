# Blog Platform

A modern, full-stack blog application built with React and Node.js, featuring secure authentication, image uploads, and an intuitive user interface.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Core Functionality
- **User Authentication** - Secure login/signup with JWT tokens (access & refresh)
- **Blog Post Management** - Create, read, update, and delete blog posts
- **Image Uploads** - Upload images with posts directly to MongoDB using GridFS
- **Comments System** - Users can add and delete comments on posts
- **Category Filtering** - Organize posts by categories
- **Persistent Authentication** - Automatic session restoration on page refresh
- **Form Validation** - Client-side validation with server-side verification

### UI/UX Features
- **Responsive Design** - Mobile-first approach with Material-UI components
- **Mobile Navigation** - Hamburger menu drawer for mobile devices
- **Image Preview** - Real-time image preview before upload
- **Error Handling** - Comprehensive error messages and user feedback
- **Loading States** - Skeleton loading screens for better perceived performance
- **Search & Filter** - Filter posts by categories and metadata

## 🛠 Technology Stack

### Frontend
- **React 18** - View library with hooks and functional components
- **Material-UI (MUI)** - Component library and styling solution
- **Axios** - HTTP client with request/response interceptors
- **React Router** - Client-side routing
- **Context API** - Global state management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Document database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload middleware
- **GridFS** - MongoDB file storage system
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing

### Development Tools
- **npm** - Package manager
- **Environment Variables** - Configuration management (.env)

## 📁 Project Structure

```
blog/
├── client/                          # React frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── about/              # About page
│   │   │   ├── account/            # Login page
│   │   │   ├── banner/             # Banner component
│   │   │   ├── contact/            # Contact page
│   │   │   ├── create/             # Create/Update post
│   │   │   ├── details/            # Post details & comments
│   │   │   ├── header/             # Navigation header
│   │   │   └── home/               # Home page with posts
│   │   ├── constants/
│   │   │   ├── config.js          # API config and routes
│   │   │   └── data.js            # Static data
│   │   ├── context/
│   │   │   └── DataProvider.js    # Global state (auth, account)
│   │   ├── service/
│   │   │   └── api.js             # Axios instance & interceptors
│   │   ├── utils/
│   │   │   └── common-utils.js    # Helper functions
│   │   ├── App.js                 # Main app component
│   │   └── index.js
│   └── package.json
│
└── server/                          # Express backend
    ├── controller/
    │   ├── post-controller.js      # Post CRUD operations
    │   ├── user-controller.js      # User auth operations
    │   ├── comment-controller.js   # Comment management
    │   ├── jwt-controller.js       # JWT token handling
    │   └── image-controller.js     # Image upload/retrieval
    ├── model/
    │   ├── post.js                 # Post schema
    │   ├── user.js                 # User schema
    │   ├── comment.js              # Comment schema
    │   ├── token.js                # Token schema
    │   └── category.js             # Category schema
    ├── routes/
    │   └── route.js                # All API routes
    ├── database/
    │   └── db.js                   # MongoDB connection
    ├── utils/
    │   └── upload.js               # Multer & GridFS config
    ├── index.js                    # Express server entry
    ├── package.json
    └── .env                        # Environment variables
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Clone and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Muhammad-Rizwan-06/engineers-blog-app.git
   cd blog
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

## ⚙️ Configuration

### Backend Setup (.env)

Create a `.env` file in the `server` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017/blog

# JWT Secret Keys
ACCESS_SECRET_KEY=your_access_token_secret
REFRESH_SECRET_KEY=your_refresh_token_secret

# Server Port
PORT=8000
```

### Frontend Configuration

The API base URL is configured in `client/src/constants/config.js`:
```javascript
const API_URL = 'http://localhost:8000';
```

## 💻 Usage

### Start the Development Servers

**Terminal 1 - Start Backend**
```bash
cd server
npm start
# Runs on http://localhost:8000
```

**Terminal 2 - Start Frontend**
```bash
cd client
npm start
# Runs on http://localhost:3000
```

### User Workflow

1. **Sign Up** - Create a new account with username and password
2. **Login** - Authenticate and receive JWT tokens
3. **Browse Posts** - View all published posts on the home page
4. **Create Post** - Author new posts with images and categories
5. **Add Comments** - Comment on posts (requires authentication)
6. **Manage Content** - Edit or delete your own posts
7. **Persistent Login** - Tokens are saved to sessionStorage automatically

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | User login |
| POST | `/signup` | User registration |
| POST | `/logout` | User logout |
| POST | `/token` | Refresh access token |

### Post Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/posts` | Fetch all posts | ✓ |
| GET | `/post/:id` | Fetch single post | ✓ |
| POST | `/create` | Create new post | ✓ |
| PUT | `/update/:id` | Update post | ✓ |
| DELETE | `/delete/:id` | Delete post | ✓ |

### Comment Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/comments/:id` | Fetch post comments | ✓ |
| POST | `/comment/new` | Add comment | ✓ |
| DELETE | `/comment/delete/:id` | Delete comment | ✓ |

### Image Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/file/upload` | Upload image to GridFS |
| GET | `/file/:filename` | Retrieve image from GridFS |

### Response Format

**Success Response:**
```json
{
  "isSuccess": true,
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "isError": true,
  "msg": "Error message",
  "code": 400
}
```

## 🏗 Architecture

### Authentication Flow

1. User submits login/signup credentials
2. Server validates and creates JWT tokens (access + refresh)
3. Tokens stored in sessionStorage on client
4. Every API request includes `Authorization: Bearer {token}` header
5. On 403 (token expired), client requests new access token using refresh token
6. Automatic session restoration on page refresh

### File Upload Flow

1. User selects image in CreatePost/Update forms
2. FileReader displays preview in UI
3. Form submitted with FormData (multipart/form-data)
4. Multer receives file and stores in MongoDB GridFS (bucket: "photos")
5. Server returns image URL to client
6. URL stored in post document for retrieval

### State Management

- **Global Context** - DataProvider manages authentication state
- **Session Storage** - Persists tokens and user info across sessions
- **Component State** - Local state for form inputs and loading states
- **URL State** - React Router maintains navigation state

## 🔐 Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **JWT Tokens** - Short-lived access tokens (15 minutes)
- **Token Refresh** - Secure refresh mechanism for long sessions
- **Protected Routes** - PrivateRoute component guards authenticated pages
- **CORS** - Cross-origin requests properly configured
- **Input Validation** - Server-side validation for all inputs
- **File Type Validation** - Only image uploads allowed (PNG, JPG, JPEG)

## 🐛 Error Handling

### Client-Side
- Axios interceptors catch all HTTP errors
- User-friendly error messages displayed via alerts
- Console logging for debugging
- Fallback messages when server errors are unavailable

### Server-Side
- Try-catch blocks in all controller functions
- Detailed error responses with status codes
- Validation middleware for request data
- Mongoose schema validation

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile Navigation** - Hamburger menu on screens < 900px
- **Flexible Grid** - Posts adjust to screen size
- **Touch-Friendly** - Buttons sized for touch interaction
- **Optimized Images** - Responsive image loading
- **Mobile Forms** - Full-width inputs on small screens

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

---


For questions or support, please open an issue in the repository.
