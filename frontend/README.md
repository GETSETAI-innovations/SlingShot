# Slingshot Frontend

Frontend for the Elite Slingshot Association of Chhattisgarh (ESAC) website. Built with React, Vite, and Tailwind CSS.

## 🚀 Features

- Modern React 19 with Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations
- Chart.js and Recharts for data visualization
- Responsive design with mobile-first approach
- Role-based authentication system
- Athlete registration and analytics dashboard

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🔧 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Update the following variables in `.env`:
   ```
   VITE_API_URL=http://localhost:5000
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 🔗 API Integration

The frontend uses Vite's proxy configuration to connect to the backend API. Ensure the backend is running on the URL specified in `VITE_API_URL`.

## 🎨 Styling

- Tailwind CSS for utility-first styling
- Custom color palette based on ESAC branding
- Responsive breakpoints for mobile, tablet, and desktop
- Dark mode support (optional)

## 📦 Dependencies

- React 19
- React Router DOM
- Tailwind CSS
- Framer Motion
- Chart.js
- Recharts
- Lucide React (icons)

## 🌐 Environment Variables

All environment variables must be prefixed with `VITE_` to be accessible in the client-side code:

- `VITE_API_URL` - Backend API URL (default: http://localhost:5000)

## 📄 License

ISC
