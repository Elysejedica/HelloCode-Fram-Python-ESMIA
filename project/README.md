# HelloCode Learning Platform

HelloCode is an interactive web platform designed to help users learn programming languages like they would learn human languages - through intuitive, progressive, and engaging lessons.

## Project Structure

The project is divided into two main parts:

1. **Backend (Django)**: Handles data models, APIs, and business logic
2. **Frontend (React)**: Provides the user interface and interactive components

## Features

- User authentication with JWT
- Interactive learning paths for multiple programming languages
- Live code editor with real-time execution
- Progress tracking and achievement system
- Quizzes and coding exercises
- Admin dashboard for content management

## Tech Stack

### Backend
- Django
- Django REST Framework
- JWT Authentication
- SQLite (development) / PostgreSQL (production)

### Frontend
- React
- TypeScript
- Tailwind CSS
- Monaco Editor for code editing
- React Router for navigation

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Setup Instructions

1. Clone the repository

2. Install backend dependencies:
```bash
pip install -r requirements.txt
```

3. Initialize the database:
```bash
python manage.py migrate
```

4. Create a superuser:
```bash
python manage.py createsuperuser
```

5. Install frontend dependencies:
```bash
npm install
```

6. Start the development servers:

In one terminal, start the Django server:
```bash
python manage.py runserver
```

In another terminal, start the React dev server:
```bash
npm run dev
```

7. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api/
   - Admin interface: http://localhost:8000/admin/

## API Endpoints

- `/api/register/` - User registration
- `/api/token/` - Get JWT tokens
- `/api/token/refresh/` - Refresh JWT token
- `/api/languages/` - List all programming languages
- `/api/lessons/` - List and filter lessons
- `/api/progress/` - Track user progress
- `/api/quiz-attempt/` - Submit quiz answers
- `/api/code-submission/` - Submit and run code

## License

This project is licensed under the MIT License.