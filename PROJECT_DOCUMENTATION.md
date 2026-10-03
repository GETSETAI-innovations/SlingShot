# Slingshot Project Documentation

## 📋 Project Overview

**Project Name**: Elite Slingshot Association of Chhattisgarh (ESAC) Website  
**Type**: Full-stack Web Application  
**Technologies**: React.js (Frontend), Express.js (Backend), MongoDB (Database)  
**Purpose**: Digital platform for slingshot sports federation management in Chhattisgarh

## 🏗️ Project Structure

```
SLINGSHOT/
├── frontend/                    # React.js Frontend Application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── home/          # Home page components
│   │   │   ├── layout/        # Layout components (Header, Footer, etc.)
│   │   │   └── ...
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── SportsAndRules.jsx
│   │   │   ├── AthletesAndRankings.jsx
│   │   │   ├── Districts.jsx
│   │   │   ├── TalentHuntDocuments.jsx
│   │   │   ├── Competitions.jsx
│   │   │   ├── AthleteAnalytics.jsx
│   │   │   ├── Safety.jsx
│   │   │   └── Partnerships.jsx
│   │   ├── data/              # Static data files
│   │   │   ├── districtsData.js
│   │   │   └── documentsData.js
│   │   ├── context/           # React context providers
│   │   ├── App.jsx            # Main app component
│   │   └── index.jsx          # Entry point
│   ├── public/                # Static assets
│   └── package.json
│
└── backend/                    # Express.js Backend API
    ├── controllers/           # Route controllers
    │   ├── authController.js
    │   ├── athleteController.js
    │   └── registrationController.js
    ├── models/               # Mongoose models
    │   ├── User.js
    │   └── Athlete.js
    ├── routes/               # API routes
    │   ├── auth.js
    │   ├── athlete.js
    │   └── registration.js
    ├── middleware/            # Custom middleware
    │   └── auth.js
    ├── .env                  # Environment variables
    ├── server.js             # Entry point
    ├── package.json
    └── README.md
```

## 🎨 Frontend Features

### Pages Implemented
1. **Home** - Main landing page with all sections
2. **About Us** - Organization information
3. **The Sport & Rules** - Sports rules and regulations
4. **Athletes & Rankings** - Athlete profiles and rankings
5. **33 Districts** - District network with sliding navigation (11 districts per slide)
6. **Talent Hunt & Documents** - Combined page for talent scouting and documents
7. **Competitions** - Competition information
8. **Athlete Analytics** - Performance analysis dashboard
9. **Safety** - Safety protocols (green theme)
10. **Partnerships** - Institutional collaboration (indigo theme)

### Key Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Navigation**: Dynamic highlighting based on current route
- **Theme System**: Color-coded pages for different sections
- **District Slider**: Minimal sliding navigation for 33 districts
- **Language Support**: Bilingual (English/Hindi) with Google Translate
- **Smooth Scrolling**: Automatic scroll-to-top on route changes
- **Modern UI**: Gradient backgrounds, animations, and interactive elements

### Component Architecture
- **Header**: Sticky navigation with mobile menu
- **Footer**: Comprehensive footer with links and information
- **Home Components**: Modular sections (Hero, QuickAccess, SportingEcosystem, etc.)
- **Data Integration**: Static data files for districts and documents

## 🔧 Backend Features

### API Endpoints

#### Authentication (`/api/auth`)
- `POST /register` - User registration
- `POST /login` - User login with JWT
- `GET /me` - Get current user profile
- `PUT /updatedetails` - Update user details
- `PUT /updatepassword` - Change password

#### Athletes (`/api/athletes`)
- `GET /` - Get all athletes (Admin/Coach)
- `GET /:id` - Get single athlete
- `GET /district/:district` - Get athletes by district
- `GET /leaderboard` - Public leaderboard
- `POST /` - Create athlete profile
- `PUT /:id` - Update athlete
- `PUT /:id/performance` - Update performance stats
- `DELETE /:id` - Delete athlete (Admin)

#### Registration (`/api/registration`)
- `POST /` - Submit athlete registration
- `GET /status/:esacId` - Check registration status
- `GET /pending` - Get pending registrations (Admin)
- `PUT /:id/approve` - Approve registration (Admin)
- `PUT /:id/reject` - Reject registration (Admin)

### Database Models

#### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['admin', 'coach', 'athlete', 'district_coordinator', 'user'],
  phone: String,
  district: String (33 Chhattisgarh districts),
  address: Object,
  isActive: Boolean,
  profilePicture: String,
  dateOfBirth: Date,
  gender: String
}
```

#### Athlete Model
```javascript
{
  esacId: String (unique, auto-generated),
  userId: ObjectId (ref: User),
  personalDetails: Object,
  contactDetails: Object,
  address: Object,
  sportsDetails: Object,
  coachDetails: Object,
  medicalInfo: Object,
  documents: Object,
  registrationStatus: ['pending', 'approved', 'rejected', 'suspended'],
  ranking: Object,
  performance: Object,
  isActive: Boolean
}
```

### Security Features
- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Token-based authentication with expiration
- **Role-Based Access**: Authorization middleware for different user roles
- **Input Validation**: express-validator for request validation
- **CORS**: Configured for frontend-backend communication
- **Environment Variables**: Sensitive data stored in .env file

## 🗄️ Database Configuration

### MongoDB Connection
```javascript
MONGODB_URI=mongodb://localhost:27017/slingshot
```

### Database Collections
- **users**: User accounts and authentication
- **athletes**: Athlete profiles and performance data

### Indexes
- Compound indexes for efficient queries
- Unique indexes on email, ESAC ID, Aadhar number
- District-based indexing for geographical queries

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (v4.4+)
- npm or yarn

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
npm install
# Configure .env file
npm run dev
```

### Environment Variables (Backend)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/slingshot
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

## 🎯 User Roles & Permissions

### Admin
- Full access to all endpoints
- User management
- Registration approval/rejection
- Performance data management

### Coach
- View athlete profiles
- Update athlete performance
- Access district-level data

### Athlete
- View own profile
- Update personal details
- View performance statistics

### District Coordinator
- Access district-specific data
- Monitor local athletes
- Coordinate with central office

### User
- Basic registration
- View public information
- Submit registration forms

## 🌍 District Coverage

All 33 districts of Chhattisgarh are supported:
Raipur, Bastar, Bilaspur, Durg, Surguja, Rajnandgaon, Korba, Dantewada, Sukma, Balod, Baloda Bazar, Balrampur, Bemetara, Bijapur, Dhamtari, Gariaband, Gaurela-Pendra-Marwahi, Janjgir-Champa, Jashpur, Kabeerdham, Kanker, Kondagaon, Koriya, Mahasamund, Manpur, Mungeli, Narayanpur, Raigarh, Surajpur, Khairagarh-Chhuikhadan-Gandai, Mohla-Manpur-Ambagadh Chowki, Sakti, Sarangarh-Bilaigarh, Shivrinarayan

## 📊 Key Features Breakdown

### 1. District Management
- Complete database of 33 districts
- Sliding navigation (11 districts per slide)
- Search functionality
- Coordinator information
- Central range locations
- Athlete counts per district

### 2. Athlete Registration
- Automated ESAC ID generation
- Complete personal information collection
- Medical information tracking
- Document upload support
- Registration workflow (pending → approved/rejected)

### 3. Performance Tracking
- Match statistics (wins, losses, total matches)
- Score tracking (best score, average score)
- Ranking system (state and district level)
- Category-based rankings (junior, senior, veteran)

### 4. Safety & Standards
- Dedicated safety page with green theme
- State-certified safety protocols
- Emergency procedures
- Equipment inspection requirements

### 5. Partnerships
- Institutional collaboration page
- Partnership opportunities
- CSR integration
- Contact functionality

## 🔮 Future Enhancements

### Planned Features
- Real-time notifications
- Live competition scoring
- Video training modules
- Mobile app development
- Advanced analytics dashboard
- Payment gateway for registrations
- Social media integration
- Multi-language support expansion

### Technical Improvements
- API rate limiting
- Redis caching
- File upload optimization
- Advanced search functionality
- Data export features
- Email notifications
- SMS integration

## 📝 Development Notes

### Frontend Technologies
- React.js 18
- React Router
- Tailwind CSS
- Lucide Icons
- Google Translate API

### Backend Technologies
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs
- express-validator
- CORS

### Development Tools
- nodemon (backend hot reload)
- ESLint (code quality)
- Git (version control)

## 🐛 Known Issues & Solutions

### Frontend
- **Issue**: Google Translate sometimes affects layout
- **Solution**: CSS isolation for translated elements

### Backend
- **Issue**: MongoDB connection pooling in development
- **Solution**: Proper connection management with retry logic

## 📞 Support & Maintenance

### Regular Maintenance Tasks
- Database backups
- Security updates
- Performance monitoring
- Log analysis
- User support

### Emergency Contacts
- Technical: backend-team@esac-cg.org
- Content: content-team@esac-cg.org
- General: contact@esac-cg.org

## 📄 Legal & Compliance

### Data Protection
- User data encryption
- GDPR compliance measures
- Privacy policy implementation
- Cookie consent management

### Sports Governance
- ESAC constitution compliance
- State sports body regulations
- Anti-doping protocols
- Fair competition standards

---

**Last Updated**: 2026-09-29  
**Version**: 1.0.0  
**Status**: Active Development