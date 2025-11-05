# 📝 MERN Stack Blog Application

A full-stack blog application built with **MongoDB**, **Express.js**, **React.js**, and **Node.js**. This project demonstrates modern web development practices with user authentication, CRUD operations, real-time comments, and a beautiful responsive UI.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?logo=express)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Frontend Routes](#-frontend-routes)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login with JWT
- Protected routes (client & server)
- Password hashing with bcrypt
- Token-based authentication
- Session persistence with localStorage

### 📄 Blog Post Management
- Create, read, update, and delete posts
- Rich text content
- Post excerpts and featured images
- Category organization
- Tagging system
- Draft and published states
- View count tracking
- Slug-based URLs

### 💬 Interactive Features
- Comment system
- Real-time comment updates
- User profiles with avatar
- Search functionality
- Category filtering
- Pagination

### 🎨 UI/UX
- Responsive design (mobile-first)
- Loading states and spinners
- Error handling with user feedback
- Optimistic UI updates
- Clean and modern interface
- Smooth animations

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.18+ | Web framework |
| MongoDB | 5.0+ | Database |
| Mongoose | 7.6+ | ODM for MongoDB |
| JWT | 9.0+ | Authentication |
| Bcrypt.js | 2.4+ | Password hashing |
| Joi | 17.11+ | Input validation |
| CORS | 2.8+ | Cross-origin requests |
| Dotenv | 16.3+ | Environment variables |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2+ | UI library |
| React Router | 6.18+ | Client-side routing |
| Axios | 1.5+ | HTTP client |
| Vite | 4.5+ | Build tool & dev server |
| Context API | - | State management |

---

## 📁 Project Structure

```
mern-blog/
│
├── client/                          # React Frontend
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── PostCard.jsx
│   │   │   ├── PostCard.css
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── LoadingSpinner.css
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── Posts.jsx
│   │   │   ├── Posts.css
│   │   │   ├── PostDetail.jsx
│   │   │   ├── PostDetail.css
│   │   │   ├── CreatePost.jsx
│   │   │   ├── CreatePost.css
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Auth.css
│   │   │
│   │   ├── context/                 # React Context for state
│   │   │   ├── AuthContext.jsx      # Authentication state
│   │   │   └── PostContext.jsx      # Posts state
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useApi.js            # Generic API hook
│   │   │   └── useCategories.js     # Category management
│   │   │
│   │   ├── services/                # API communication
│   │   │   └── api.js               # Axios instance & endpoints
│   │   │
│   │   ├── App.jsx                  # Main app component
│   │   ├── App.css                  # Global styles
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Base CSS
│   │
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   ├── package.json                 # Frontend dependencies
│   ├── .env.example                 # Environment template
│   └── .env                         # Environment variables
│
└── server/                          # Express Backend
    ├── config/
    │   └── db.js                    # MongoDB connection
    │
    ├── controllers/                 # Request handlers
    │   ├── authController.js        # Auth operations
    │   ├── postController.js        # Post CRUD operations
    │   └── categoryController.js    # Category operations
    │
    ├── models/                      # Mongoose schemas
    │   ├── User.js                  # User model
    │   ├── Post.js                  # Post model
    │   └── Category.js              # Category model
    │
    ├── routes/                      # API routes
    │   ├── auth.js                  # Auth endpoints
    │   ├── posts.js                 # Post endpoints
    │   └── categories.js            # Category endpoints
    │
    ├── middleware/                  # Custom middleware
    │   ├── auth.js                  # JWT verification
    │   ├── errorHandler.js          # Error handling
    │   └── validation.js            # Input validation
    │
    ├── utils/                       # Utility functions
    │   └── generateToken.js         # JWT token generator
    │
    ├── uploads/                     # File uploads (create this)
    ├── server.js                    # Main server file
    ├── package.json                 # Backend dependencies
    ├── .env.example                 # Environment template
    └── .env                         # Environment variables
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)
- **npm** or **pnpm** - Package manager
- **Git** - Version control
- **VS Code** (recommended) - Code editor

### Check Prerequisites:
```bash
node --version    # Should be v18+
npm --version     # or pnpm --version
mongod --version  # Should be v5+
```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd mern-blog
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
# or
pnpm install
```

**Backend Dependencies Installed:**
- express
- mongoose
- cors
- dotenv
- bcryptjs
- jsonwebtoken
- joi
- nodemon (dev)

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
# or
pnpm install
```

**Frontend Dependencies Installed:**
- react
- react-dom
- react-router-dom
- axios
- vite
- @vitejs/plugin-react

### 4. Create Necessary Folders
```bash
# In server directory
cd ../server
mkdir uploads
```

---

## 🔐 Environment Variables

### Backend Environment (.env)

Create `server/.env` file:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/mern-blog

# Option 2: MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRE=30d

# File Upload Configuration (optional)
MAX_FILE_SIZE=5000000
FILE_UPLOAD_PATH=./uploads
```

### Frontend Environment (.env)

Create `client/.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

### 🔒 Security Notes:
- **NEVER** commit `.env` files to Git
- Use strong, random JWT secrets in production
- Change default credentials
- Use environment-specific values

---

## 🏃 Running the Application

### Method 1: Run Separately (Recommended for Development)

#### Terminal 1 - Start MongoDB
```bash
# Windows
mongod

# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### Terminal 2 - Start Backend Server
```bash
cd server
npm run dev
# or
node server.js
```

**Expected Output:**
```
Connected to MongoDB
Server running in development mode on port 5000
```

#### Terminal 3 - Start Frontend
```bash
cd client
npm run dev
# or
pnpm run dev
```

**Expected Output:**
```
VITE v4.5.0  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Method 2: Production Build

```bash
# Build frontend
cd client
npm run build

# Serve frontend from backend
cd ../server
# Add static middleware in server.js
node server.js
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "bio": "Software Developer"
}
```

---

### Post Endpoints

#### Get All Posts (Public)
```http
GET /api/posts?page=1&limit=10&category=technology
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `category` (optional): Filter by category slug

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Getting Started with MERN",
      "content": "Full content here...",
      "excerpt": "Short description",
      "slug": "getting-started-with-mern-1234567890",
      "author": {
        "_id": "507f191e810c19729de860ea",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "category": {
        "_id": "507f191e810c19729de860eb",
        "name": "Technology",
        "slug": "technology",
        "color": "#3498db"
      },
      "tags": ["mern", "nodejs", "react"],
      "isPublished": true,
      "viewCount": 150,
      "comments": [],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### Get Single Post (Public)
```http
GET /api/posts/:id
# or
GET /api/posts/:slug
```

#### Create Post (Protected)
```http
POST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the full content of my post...",
  "excerpt": "Short description for preview",
  "category": "507f191e810c19729de860eb",
  "tags": ["javascript", "react", "nodejs"],
  "isPublished": true
}
```

#### Update Post (Protected)
```http
PUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Post (Protected)
```http
DELETE /api/posts/:id
Authorization: Bearer <token>
```

#### Add Comment (Protected)
```http
POST /api/posts/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great post! Very helpful."
}
```

#### Search Posts (Public)
```http
GET /api/posts/search?q=javascript
```

---

### Category Endpoints

#### Get All Categories (Public)
```http
GET /api/categories
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f191e810c19729de860eb",
      "name": "Technology",
      "slug": "technology",
      "description": "Tech related posts",
      "color": "#3498db",
      "postCount": 15
    }
  ],
  "count": 5
}
```

#### Create Category (Protected - Admin Only)
```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Technology",
  "description": "All about tech",
  "color": "#3498db"
}
```

---

### Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (no token or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

---

## 🌐 Frontend Routes

### Public Routes
- `/` - Home page with featured posts
- `/posts` - All posts with filters
- `/posts/:id` - Single post detail
- `/login` - User login
- `/register` - User registration

### Protected Routes (Require Authentication)
- `/create-post` - Create new post
- `/edit-post/:id` - Edit existing post
- `/profile` - User profile

---

## 🧪 Testing

### Initial Setup - Create Test Data

Before using the app, you need to create initial data:

#### Step 1: Register a User (via Frontend)
1. Go to `http://localhost:3000/register`
2. Create account with:
   - Name: Test User
   - Email: test@example.com
   - Password: password123

#### Step 2: Create Categories (via API)

Use **Postman**, **Thunder Client**, or **curl**:

```bash
# Get your token from login response, then:

curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Technology",
    "description": "Tech posts",
    "color": "#3498db"
  }'

curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Lifestyle",
    "description": "Life posts",
    "color": "#e74c3c"
  }'
```

#### Step 3: Create a Test Post (via Frontend)
1. Login to the app
2. Click "Create Post"
3. Fill in the form:
   - Title: "My First MERN Post"
   - Content: "This is my first post using MERN stack..."
   - Category: Select "Technology"
   - Tags: "mern, nodejs, react"
   - Check "Publish immediately"
4. Click "Create Post"

### Testing Checklist

- [ ] User registration works
- [ ] User login works
- [ ] Token is saved in localStorage
- [ ] Categories are created
- [ ] Can create a post
- [ ] Can view all posts
- [ ] Can view single post
- [ ] Can edit own post
- [ ] Can delete own post
- [ ] Can add comments
- [ ] Search functionality works
- [ ] Category filtering works
- [ ] Pagination works
- [ ] Protected routes redirect to login
- [ ] Logout clears token

---

## 🐛 Troubleshooting

### Issue: MongoDB Connection Error
```
Error: Failed to connect to MongoDB
```

**Solutions:**
1. Make sure MongoDB is running: `mongod`
2. Check MongoDB URI in `.env`
3. If using Atlas, check:
   - Username/password are correct
   - IP whitelist includes your IP
   - Database name exists

---

### Issue: CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
Check `server/server.js` has:
```javascript
const cors = require('cors');
app.use(cors());
```

---

### Issue: Port Already in Use
```
Error: Port 5000 is already in use
```

**Solutions:**
```bash
# Find process using port 5000
# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

### Issue: JWT Token Error
```
Error: Not authorized to access this route
```

**Solutions:**
1. Make sure you're logged in
2. Check token in localStorage (Dev Tools > Application > Local Storage)
3. Token format should be: `Bearer <actual-token>`
4. Check JWT_SECRET matches in .env

---

### Issue: Slug Required Error
```
Path 'slug' is required
```

**Solution:**
Update `server/models/Post.js` - change `pre('save')` to `pre('validate')` and remove `required: true` from slug field.

---

### Issue: Module Not Found
```
Cannot find module 'react-router-dom'
```

**Solution:**
```bash
cd client
npm install
# or
pnpm install
```

---

### Issue: Vite Not Starting
```
Error: Cannot find module 'vite'
```

**Solution:**
```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

---

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/home.png)
*Hero section with featured posts*

### Posts List with Filters
![Posts List](./screenshots/posts-list.png)
*Category filtering and search*

### Single Post View
![Post Detail](./screenshots/post-detail.png)
*Post with comments section*

### Create Post Form
![Create Post](./screenshots/create-post.png)
*Rich post creation interface*

### Authentication Pages
![Login](./screenshots/login.png)
*Clean login interface*

---

## 🎯 Key Features Explained

### 1. Authentication Flow
1. User registers → Password hashed with bcrypt
2. User logs in → JWT token generated
3. Token stored in localStorage
4. Token sent with every request in Authorization header
5. Server verifies token with middleware
6. Access granted or denied

### 2. Post Creation Flow
1. User authenticated (token required)
2. Form validation (client & server)
3. Slug auto-generated from title
4. Author ID added from token
5. Post saved to MongoDB
6. UI updated optimistically

### 3. Comment System
1. User must be logged in
2. Comment added to post's comments array
3. Post document updated
4. UI re-fetches post to show new comment

---

## 🚀 Deployment

### Backend Deployment (Heroku)

1. Create `Procfile`:
```
web: node server.js
```

2. Deploy:
```bash
heroku create your-app-name
git push heroku main
heroku config:set MONGODB_URI=your_atlas_uri
heroku config:set JWT_SECRET=your_secret
```

### Frontend Deployment (Vercel)

1. Build the app:
```bash
cd client
npm run build
```

2. Deploy:
```bash
vercel deploy
```

3. Update `.env` with production API URL

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

### Code Style
- Use meaningful variable names
- Add comments for complex logic
- Follow existing code structure
- Write clean, readable code

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/ByteCortex00)

---

## 🙏 Acknowledgments

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/)
- [Mongoose Documentation](https://mongoosejs.com/)
- MERN Stack Community

---

## 📊 Project Stats

- **Total Files**: 50+
- **Lines of Code**: 3000+
- **Technologies Used**: 15+
- **Development Time**: X hours

---

## 🔮 Future Enhancements

- [ ] Image upload for posts
- [ ] User profile pictures
- [ ] Like/Unlike posts
- [ ] Social media sharing
- [ ] Email notifications
- [ ] Rich text editor (TinyMCE/Quill)
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Post drafts
- [ ] Scheduled publishing
- [ ] SEO optimization
- [ ] Analytics dashboard
- [ ] Admin panel

---

## 💡 Tips for Success

1. **Always check both servers are running**
2. **Create categories before creating posts**
3. **Use MongoDB Compass to view data visually**
4. **Check browser console for frontend errors**
5. **Check terminal for backend errors**
6. **Test API with Postman before using frontend**
7. **Keep .env files secure**
8. **Commit code regularly**
9. **Read error messages carefully**
10. **Have fun coding!** 🎉

---

## 📞 Support

If you have questions or need help:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Contact the author
4. Join our Discord community (if available)

---

## ⭐ Show Your Support

If this project helped you, please give it a ⭐ on GitHub!

---

**Happy Coding! 🚀**