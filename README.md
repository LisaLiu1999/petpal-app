# Pet Pal Services 🐾

A modern pet service booking application built with React and Vite, integrated with Strapi Headless CMS for dynamic content management.

## 📋 Project Overview

Pet Pal Services is a comprehensive platform that allows pet owners to:
- Browse various pet services (grooming, vaccinations, check-ups)
- View detailed service information including pricing and duration
- Contact service providers directly
- Manage bookings and appointments

All content is dynamically managed through Strapi CMS, providing flexibility and easy content updates.

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

### Backend
- **Strapi** - Headless CMS
- **REST API** - API architecture

## 📁 Repository Structure

```
petpal-app/
├── frontend/          # React + Vite application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Strapi CMS
│   ├── src/
│   ├── config/
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LisaLiu1999/petpal-app.git
   cd petpal-app
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Strapi CMS backend**
   ```bash
   cd backend
   npm run develop
   ```
   The Strapi admin panel will be available at `http://localhost:1337/admin`

2. **Start the React frontend** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 🔧 Development

### Backend (Strapi)
- Admin panel: `http://localhost:1337/admin`
- API endpoint: `http://localhost:1337/api`

### Frontend (React)
- Development server: `http://localhost:5173`
- Built with Vite for fast development and hot module replacement

## 📚 API Documentation

The Strapi backend provides RESTful API endpoints for:
- Pet services management
- User authentication
- Booking management
- Service provider profiles

API documentation is available through the Strapi admin panel.


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Issues

If you encounter any issues, please report them on the [GitHub Issues](https://github.com/LisaLiu1999/petpal-app/issues) page.

