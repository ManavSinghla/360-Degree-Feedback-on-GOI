# 360-Degree Feedback on GOI News Platform

A comprehensive MERN stack web application for collecting and analyzing 360-degree feedback on Government of India news stories published in regional media.

## 🌟 Features

### User Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Browse News Stories**: Access government news from various regional media sources
- **Advanced Filtering**: Filter news by region, category, and language
- **Submit Feedback**: Provide sentiment-based feedback (Positive, Neutral, Negative) with comments and ratings
- **Track Feedback**: View all your submitted feedback in one place

### Admin Features
- **News Management**: Add, update, and delete news stories with comprehensive metadata
- **Analytics Dashboard**: View visual insights with charts showing:
  - Sentiment distribution across all feedback
  - Feedback breakdown by region and category
  - Recent feedback submissions
- **Filtering Options**: Filter analytics by region, category, and language

## 🛠️ Technology Stack

### Backend
- **Node.js** & **Express.js**: RESTful API server
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB
- **JWT**: Secure authentication
- **bcryptjs**: Password hashing

### Frontend
- **React.js**: Dynamic UI components
- **React Router**: Client-side routing
- **Context API**: State management
- **Chart.js & react-chartjs-2**: Data visualization
- **Axios**: HTTP client

## 📋 Prerequisites

Before running this application, ensure you have:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ManavSinghla/360-Degree-Feedback-on-GOI.git
cd 360-Degree-Feedback-on-GOI
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/feedback360
# JWT_SECRET=your_secret_key_here
# JWT_EXPIRE=7d

# Start the backend server
npm start

# For development with auto-restart:
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend will run on `http://localhost:3000`

### 4. Database Setup

Ensure MongoDB is running on your system:

```bash
# On macOS with Homebrew:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

# On Windows:
# Start MongoDB service from Services application
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: { name, email, password, role? }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
```

#### Get Current User
```
GET /api/auth/me
Headers: Authorization: Bearer {token}
```

### News Story Endpoints

#### Get All News Stories
```
GET /api/news?region=&category=&language=&page=1&limit=10
```

#### Get Single News Story
```
GET /api/news/:id
```

#### Create News Story (Admin Only)
```
POST /api/news
Headers: Authorization: Bearer {token}
Body: { title, description, content, region, category, language, publishDate, ... }
```

#### Update News Story (Admin Only)
```
PUT /api/news/:id
Headers: Authorization: Bearer {token}
Body: { fields to update }
```

#### Delete News Story (Admin Only)
```
DELETE /api/news/:id
Headers: Authorization: Bearer {token}
```

### Feedback Endpoints

#### Create Feedback
```
POST /api/feedback
Headers: Authorization: Bearer {token}
Body: { newsStory, sentiment, comment, rating }
```

#### Get Feedback by News Story
```
GET /api/feedback/news/:newsId
```

#### Get My Feedback
```
GET /api/feedback/my-feedback
Headers: Authorization: Bearer {token}
```

#### Update Feedback
```
PUT /api/feedback/:id
Headers: Authorization: Bearer {token}
Body: { fields to update }
```

#### Delete Feedback
```
DELETE /api/feedback/:id
Headers: Authorization: Bearer {token}
```

### Analytics Endpoints (Admin Only)

#### Get Dashboard Analytics
```
GET /api/analytics/dashboard?region=&category=&language=
Headers: Authorization: Bearer {token}
```

#### Get Feedback Trends
```
GET /api/analytics/trends?days=30
Headers: Authorization: Bearer {token}
```

## 📁 Project Structure

```
360-Degree-Feedback-on-GOI/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── newsController.js     # News CRUD operations
│   │   ├── feedbackController.js # Feedback operations
│   │   └── analyticsController.js# Analytics data
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── NewsStory.js          # News story schema
│   │   └── Feedback.js           # Feedback schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── news.js               # News routes
│   │   ├── feedback.js           # Feedback routes
│   │   └── analytics.js          # Analytics routes
│   ├── .env.example              # Environment variables template
│   ├── package.json
│   └── server.js                 # Express server entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation bar
│   │   │   ├── Navbar.css
│   │   │   └── PrivateRoute.js   # Route protection
│   │   ├── context/
│   │   │   └── AuthContext.js    # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.js           # Landing page
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Register.js       # Registration page
│   │   │   ├── NewsList.js       # Browse news stories
│   │   │   ├── NewsDetail.js     # News detail & feedback
│   │   │   ├── MyFeedback.js     # User's feedback history
│   │   │   ├── AdminNews.js      # Admin news management
│   │   │   └── Analytics.js      # Admin analytics dashboard
│   │   ├── services/
│   │   │   └── api.js            # API service functions
│   │   ├── App.js                # Main app component
│   │   ├── App.css
│   │   └── index.js              # React entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

## 👥 User Roles

### General Users
- Register and login
- Browse news stories
- Filter news by region, category, language
- Submit feedback with sentiment analysis
- View their feedback history

### Admin Users
- All general user capabilities
- Create, update, and delete news stories
- Access analytics dashboard
- View aggregated feedback insights
- Filter analytics data

## 🎨 UI Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with gradient accents
- **Visual Analytics**: Interactive charts for data visualization
- **Real-time Filtering**: Instant results when applying filters
- **Sentiment Indicators**: Color-coded feedback sentiment display

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes and API endpoints
- Role-based access control (User/Admin)
- Input validation and sanitization

## 🚢 Deployment

### Backend Deployment (Example: Heroku)
```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
git push heroku main
```

### Frontend Deployment (Example: Netlify)
```bash
cd frontend
npm run build
# Deploy the 'build' folder to Netlify
```

### Environment Variables for Production
Make sure to set these environment variables in your production environment:
- `PORT`: Server port
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `NODE_ENV`: Set to 'production'

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created as part of the Government of India news feedback initiative.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Support

For support, email support@example.com or create an issue in the repository.

---

**Note**: This is a demonstration project. For production use, ensure proper security measures, error handling, and scalability considerations are implemented.
