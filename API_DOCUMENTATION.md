# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // Optional: "user" (default) or "admin"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login
**POST** `/auth/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Get Current User
**GET** `/auth/me`

Returns the currently authenticated user's information.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## News Story Endpoints

### Get All News Stories
**GET** `/news`

Retrieves a paginated list of news stories with optional filtering.

**Query Parameters:**
- `region` (optional): Filter by region (North, South, East, West, Central, Northeast)
- `category` (optional): Filter by category (Politics, Economy, Education, etc.)
- `language` (optional): Filter by language (English, Hindi, Bengali, etc.)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10)

**Example:** `/news?region=North&category=Politics&page=1&limit=10`

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "story-id",
      "title": "Government Announces New Policy",
      "description": "Short description...",
      "content": "Full content...",
      "region": "North",
      "category": "Politics",
      "language": "English",
      "publishDate": "2024-01-15T00:00:00.000Z",
      "author": "Author Name",
      "sourceUrl": "https://source.com/article",
      "createdBy": {
        "name": "Admin User",
        "email": "admin@example.com"
      }
    }
  ]
}
```

### Get Single News Story
**GET** `/news/:id`

Retrieves details of a specific news story.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "story-id",
    "title": "Government Announces New Policy",
    "description": "Short description...",
    "content": "Full content...",
    "region": "North",
    "category": "Politics",
    "language": "English",
    "publishDate": "2024-01-15T00:00:00.000Z",
    "author": "Author Name",
    "sourceUrl": "https://source.com/article",
    "createdBy": {
      "name": "Admin User",
      "email": "admin@example.com"
    }
  }
}
```

### Create News Story (Admin Only)
**POST** `/news`

Creates a new news story.

**Headers:** `Authorization: Bearer <admin-token>`

**Request Body:**
```json
{
  "title": "Government Announces New Policy",
  "description": "Short description of the news",
  "content": "Full content of the news article...",
  "region": "North",
  "category": "Politics",
  "language": "English",
  "publishDate": "2024-01-15",
  "author": "Author Name",
  "sourceUrl": "https://source.com/article"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "_id": "story-id",
    "title": "Government Announces New Policy",
    // ... other fields
  }
}
```

### Update News Story (Admin Only)
**PUT** `/news/:id`

Updates an existing news story.

**Headers:** `Authorization: Bearer <admin-token>`

**Request Body:** (Include only fields to update)
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Response:** `200 OK`

### Delete News Story (Admin Only)
**DELETE** `/news/:id`

Deletes a news story.

**Headers:** `Authorization: Bearer <admin-token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {}
}
```

---

## Feedback Endpoints

### Create Feedback
**POST** `/feedback`

Submits feedback for a news story.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "newsStory": "story-id",
  "sentiment": "Positive",  // "Positive", "Neutral", or "Negative"
  "comment": "This is a great initiative...",
  "rating": 5  // 1-5
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "_id": "feedback-id",
    "newsStory": "story-id",
    "user": "user-id",
    "sentiment": "Positive",
    "comment": "This is a great initiative...",
    "rating": 5,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Get Feedback by News Story
**GET** `/feedback/news/:newsId`

Retrieves all feedback for a specific news story.

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "feedback-id",
      "user": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "sentiment": "Positive",
      "comment": "Great initiative!",
      "rating": 5,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Get My Feedback
**GET** `/feedback/my-feedback`

Retrieves all feedback submitted by the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "feedback-id",
      "newsStory": {
        "title": "News Title",
        "region": "North",
        "category": "Politics",
        "language": "English"
      },
      "sentiment": "Positive",
      "comment": "Great initiative!",
      "rating": 5,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Update Feedback
**PUT** `/feedback/:id`

Updates user's own feedback.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "sentiment": "Neutral",
  "comment": "Updated comment",
  "rating": 3
}
```

**Response:** `200 OK`

### Delete Feedback
**DELETE** `/feedback/:id`

Deletes user's own feedback (or admin can delete any).

**Headers:** `Authorization: Bearer <token>`

**Response:** `200 OK`

---

## Analytics Endpoints (Admin Only)

### Get Dashboard Analytics
**GET** `/analytics/dashboard`

Retrieves comprehensive analytics data for the dashboard.

**Headers:** `Authorization: Bearer <admin-token>`

**Query Parameters:**
- `region` (optional): Filter by region
- `category` (optional): Filter by category
- `language` (optional): Filter by language
- `startDate` (optional): Start date for filtering (ISO format)
- `endDate` (optional): End date for filtering (ISO format)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalNewsStories": 100,
      "totalFeedback": 450
    },
    "sentimentDistribution": [
      { "_id": "Positive", "count": 250 },
      { "_id": "Neutral", "count": 120 },
      { "_id": "Negative", "count": 80 }
    ],
    "feedbackByRegion": [
      {
        "_id": "North",
        "count": 150,
        "positiveCount": 80,
        "neutralCount": 45,
        "negativeCount": 25
      }
    ],
    "feedbackByCategory": [
      {
        "_id": "Politics",
        "count": 200,
        "positiveCount": 120,
        "neutralCount": 50,
        "negativeCount": 30
      }
    ],
    "recentFeedback": [
      // Array of recent feedback entries
    ]
  }
}
```

### Get Feedback Trends
**GET** `/analytics/trends`

Retrieves feedback trends over time.

**Headers:** `Authorization: Bearer <admin-token>`

**Query Parameters:**
- `days` (optional): Number of days to look back (default: 30)

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "_id": {
        "date": "2024-01-15",
        "sentiment": "Positive"
      },
      "count": 15
    }
  ]
}
```

---

## Error Responses

### Common Error Codes

**400 Bad Request**
```json
{
  "success": false,
  "message": "Error description"
}
```

**401 Unauthorized**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**403 Forbidden**
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

**404 Not Found**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**429 Too Many Requests**
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Rate Limits

- **Authentication endpoints** (`/auth/login`, `/auth/register`): 5 requests per 15 minutes
- **Write operations** (POST, PUT, DELETE): 30 requests per 15 minutes
- **Read operations** (GET): 100 requests per 15 minutes

## Data Models

### User Roles
- `user`: Regular user (can browse news and submit feedback)
- `admin`: Administrator (can manage news stories and view analytics)

### Regions
North, South, East, West, Central, Northeast

### Categories
Politics, Economy, Education, Health, Infrastructure, Technology, Environment, Social Welfare, Other

### Languages
English, Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Urdu, Kannada, Malayalam, Punjabi, Other

### Sentiments
Positive, Neutral, Negative
