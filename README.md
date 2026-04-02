# Blog Application (FARM Stack)

A full-stack blog application built using the FARM stack:

- FastAPI - Backend API
- React - Frontend user interface
- MongoDB - Database

This project demonstrates a complete CRUD-based blog system where users can create, read, update, and delete blog posts through a simple and responsive interface.

This repository is forked from Hardvan and used as a learning project to understand full-stack development and backend API design.

## Features

- Create blog posts
- Read all blog posts
- View individual blog posts
- Update existing blog posts
- Delete blog posts
- FastAPI REST API backend
- React frontend UI
- MongoDB cloud database integration
- CORS enabled for frontend-backend communication

## Tech Stack

### Backend

- FastAPI
- Python
- Motor (Async MongoDB driver)

### Frontend

- React
- JavaScript
- React Hooks

### Database

- MongoDB Atlas

### Tools

- Node.js
- npm
- VS Code

## Project Architecture

```
React Frontend
      |
HTTP API Requests
      |
FastAPI Backend
      |
MongoDB Database
```

The React frontend interacts with the FastAPI backend through REST APIs.
The backend processes requests and performs database operations using MongoDB.

## Folder Structure

```
blog_app
|
|-- backend
|   |-- main.py
|   |-- database.py
|   |-- models
|   |-- routes
|   |-- schemas
|
|-- frontend
|   |-- src
|   |-- public
|   |-- package.json
|
|-- README.md
```

## Backend

Handles:

- API endpoints
- Database connection
- CRUD logic
- Data validation

## Frontend

Handles:

- User interface
- Form input
- API requests
- Dynamic rendering of blog posts

## API Endpoints

### Create Post

`POST /posts/`

Creates a new blog post.

### Get All Posts

`GET /posts/`

Returns all blog posts.

### Get Post by ID

`GET /posts/{post_id}`

Retrieves a specific blog post using its ID.

### Update Post

`PUT /posts/{post_id}`

Updates an existing blog post.

### Delete Post

`DELETE /posts/{post_id}`

Deletes a blog post from the database.

## Database Setup

This project uses MongoDB Atlas as the cloud database.

Example connection string:

```
mongodb+srv://db_user:<password>@cluster0.qwshkfs.mongodb.net/blog_app
```

Database configuration in backend:

```python
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_DETAILS = "mongodb+srv://db_user:<password>@cluster0.qwshkfs.mongodb.net/blog_app"

client = AsyncIOMotorClient(MONGO_DETAILS)

database = client.blog_app

post_collection = database.get_collection("posts")
```

## Installation and Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/blog_app.git
cd blog_app
```

### Backend Setup

Install dependencies:

```
pip install -r requirements.txt
```

Run the FastAPI server:

```
uvicorn main:app --reload
```

Backend runs on:

```
http://localhost:8000
```

API documentation:

```
http://localhost:8000/docs
```

### Frontend Setup

Navigate to the frontend directory:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start the React development server:

```
npm start
```

Frontend runs on:

```
http://localhost:3000
```

## Application Workflow

1. User interacts with the React UI.
2. React sends API requests to the FastAPI backend.
3. FastAPI processes requests and communicates with MongoDB.
4. Data is stored or retrieved from the database.
5. The response is returned to the frontend and displayed.

## Learning Outcomes

Through this project I learned:

- Building REST APIs using FastAPI
- Full-stack development using the FARM stack
- Integrating React with backend APIs
- Working with MongoDB Atlas cloud databases
- Implementing CRUD operations in real-world applications

## Future Improvements

- User authentication (JWT)
- Blog comments system
- Image upload for blog posts
- Pagination and search
- Docker containerization
- Deployment

## License

This project is for educational and learning purposes.