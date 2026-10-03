# Slingshot Backend API

Backend API for the Elite Slingshot Association of Chhattisgarh (ESAC) website. This API handles user authentication, athlete registration, performance tracking, and administrative functions.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Athlete Management**: Complete athlete registration, profile management, and performance tracking
- **District Coverage**: Support for all 33 districts of Chhattisgarh
- **Registration System**: Automated ESAC ID generation and registration workflow
- **Performance Analytics**: Track athlete performance, rankings, and statistics
- **Admin Dashboard**: Registration approval/rejection workflow
- **Leaderboard System**: Real-time athlete rankings by district and category

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Update the following variables in `.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/slingshot
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   ```bash
   # On Windows
   net start MongoDB

   # On Mac/Linux
   sudo systemctl start mongod
   ```

5. **Run the server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## 🗄️ Database Schema

### User Model
- **Personal Info**: Name, email, phone, district, address
- **Authentication**: Email/password with bcrypt hashing
- **Roles**: admin, coach, athlete, district_coordinator, user
- **Status**: Active/inactive account status

### Athlete Model
- **Personal Details**: Full name, DOB, gender, blood group, Aadhar
- **Contact Info**: Phone, email, emergency contacts
- **Address**: Complete address with district (33 Chhattisgarh districts)
- **Sports Details**: Category, preferred distance, experience level
- **Coach Details**: Coach information and academy
- **Medical Info**: Medical conditions and medications
- **Documents**: Aadhar card, photo, medical certificate, consent form
- **Performance**: Match statistics, scores, rankings
- **Registration Status**: pending, approved, rejected, suspended

## 🛣️ API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |
| GET | `/me` | Get current user | Yes |
| PUT | `/updatedetails` | Update user details | Yes |
| PUT | `/updatepassword` | Update password | Yes |

### Athletes (`/api/athletes`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all athletes | Admin/Coach |
| GET | `/:id` | Get single athlete | Yes |
| GET | `/district/:district` | Get athletes by district | Yes |
| GET | `/leaderboard` | Get leaderboard | No |
| POST | `/` | Create athlete | Yes |
| PUT | `/:id` | Update athlete | Yes |
| PUT | `/:id/performance` | Update performance | Admin/Coach |
| DELETE | `/:id` | Delete athlete | Admin |

### Registration (`/api/registration`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Submit registration | No |
| GET | `/status/:esacId` | Check registration status | No |
| GET | `/pending` | Get pending registrations | Admin |
| PUT | `/:id/approve` | Approve registration | Admin |
| PUT | `/:id/reject` | Reject registration | Admin |

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Login**: Send POST request to `/api/auth/login` with email and password
2. **Receive Token**: Response includes JWT token
3. **Use Token**: Include token in Authorization header as `Bearer <token>`

Example:
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const { token } = await response.json().data;

// Use token for protected routes
const protectedResponse = await fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 📊 Example API Calls

### Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210",
    "district": "Raipur"
  }'
```

### Submit Athlete Registration
```bash
curl -X POST http://localhost:5000/api/registration \
  -H "Content-Type: application/json" \
  -d '{
    "personalDetails": {
      "fullName": "John Doe",
      "dateOfBirth": "2000-01-15",
      "gender": "male",
      "aadharNumber": "123456789012"
    },
    "contactDetails": {
      "phone": "9876543210",
      "email": "john@example.com"
    },
    "address": {
      "street": "123 Main Street",
      "city": "Raipur",
      "district": "Raipur",
      "pincode": "492001"
    },
    "sportsDetails": {
      "category": "junior",
      "preferredDistance": "10m"
    }
  }'
```

### Get Leaderboard
```bash
curl http://localhost:5000/api/athletes/leaderboard?category=junior
```

## 🎯 Role-Based Access Control

- **Admin**: Full access to all endpoints
- **Coach**: Access to athlete data and performance updates
- **Athlete**: Access to own profile and limited data
- **District Coordinator**: Access to district-specific data
- **User**: Basic access to public endpoints

## 🌍 Districts Supported

All 33 districts of Chhattisgarh:
Raipur, Bastar, Bilaspur, Durg, Surguja, Rajnandgaon, Korba, Dantewada, Sukma, Balod, Baloda Bazar, Balrampur, Bemetara, Bijapur, Dhamtari, Gariaband, Gaurela-Pendra-Marwahi, Janjgir-Champa, Jashpur, Kabeerdham, Kanker, Kondagaon, Koriya, Mahasamund, Manpur, Mungeli, Narayanpur, Raigarh, Surajpur, Khairagarh-Chhuikhadan-Gandai, Mohla-Manpur-Ambagadh Chowki, Sakti, Sarangarh-Bilaigarh, Shivrinarayan

## 🛠️ Development

### Project Structure
```
backend/
├── controllers/        # Route controllers
├── models/            # Mongoose models
├── routes/            # API routes
├── middleware/        # Custom middleware
├── .env              # Environment variables
├── server.js         # Entry point
├── package.json      # Dependencies
└── README.md         # Documentation
```

### Testing
```bash
# Health check
curl http://localhost:5000/api/health

# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## 🚨 Error Handling

The API uses standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "status": "error",
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## 📝 Notes

- All passwords are hashed using bcrypt
- JWT tokens expire after 7 days (configurable)
- ESAC IDs are automatically generated in format: ESAC[YEAR][DISTRICT_CODE][RANDOM]
- MongoDB connection uses connection pooling
- CORS is configured for frontend integration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

ISC

## 📞 Support

For issues and questions, please contact the development team.