# Quick Reels - TikTok Style Video Sharing Platform

A modern, full-stack video sharing application built with React and Node.js, featuring a TikTok-style vertical scrolling interface.

## 🚀 Features

- **TikTok-Style Interface**: Vertical scrolling video feed with snap-to-view functionality
- **User Authentication**: Secure JWT-based authentication system
- **Video Upload**: Upload and share your own videos with descriptions
- **Real-time Comments**: Comment on videos and see updates in real-time
- **Like & Share**: Engage with content through likes and shares
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Beautiful gradient designs with smooth animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **MySQL** (v5.7 or higher)
- **npm** or **yarn**

## 🛠️ Installation

### 1. Clone the Repository

```bash
cd Quick_Reels
```

### 2. Backend Setup

```bash
cd server
npm install
```

### 3. Database Configuration

1. Make sure MySQL is running
2. Create a database named `quickreals` (or update the name in `.env`)
3. The tables will be created automatically when you start the server

### 4. Environment Configuration

The `.env` file is already created in the `server` directory. Update it if needed:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=quickreals
DB_PORT=3306

JWT_SECRET=quick-reels-secret-key-2024-change-in-production
JWT_EXPIRE=7d

UPLOAD_PATH=./uploads
MAX_FILE_SIZE=104857600
```

### 5. Frontend Setup

```bash
cd ../client
npm install
```

## 🎬 Running the Application

### Start the Backend Server

```bash
cd server
npm run dev
```

The backend will run on `http://localhost:5000`

### Start the Frontend

Open a new terminal:

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📱 Usage

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in with your credentials at `/login`
3. **Browse Videos**: Scroll through the video feed on the home page
4. **Upload**: Click "Upload" in the sidebar to share your own videos
5. **Interact**: Like, comment, and share videos you enjoy

## 🏗️ Project Structure

```
Quick_Reels/
├── server/                 # Backend (Node.js/Express)
│   ├── config/            # Database configuration
│   ├── middleware/        # Auth, upload, error handling
│   ├── models/            # Sequelize models
│   ├── routes/            # API routes
│   ├── uploads/           # Uploaded videos
│   └── server.js          # Entry point
│
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Auth context
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── vite.config.js     # Vite configuration
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Videos
- `GET /api/videos` - Get all videos (paginated)
- `GET /api/videos/:id` - Get single video
- `POST /api/videos` - Upload video (protected)
- `PUT /api/videos/:id/like` - Like video (protected)
- `PUT /api/videos/:id/share` - Share video (protected)
- `DELETE /api/videos/:id` - Delete video (protected)

### Comments
- `GET /api/videos/:videoId/comments` - Get comments
- `POST /api/videos/:videoId/comments` - Add comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)

## 🎨 Technologies Used

### Backend
- **Express.js** - Web framework
- **Sequelize** - ORM for MySQL
- **JWT** - Authentication
- **Multer** - File uploads
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling with gradients and animations

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- File type validation for uploads
- SQL injection prevention with Sequelize
- XSS protection

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check database credentials in `.env`
- Verify the database `guren` exists

### Video Upload Issues
- Check file size (max 100MB)
- Ensure `uploads` directory exists and is writable
- Verify supported video formats (MP4, MPEG, MOV, AVI, WEBM)

### Port Already in Use
- Change `PORT` in server `.env` file
- Update proxy in client `vite.config.js`

## 📝 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Inspired by TikTok's user interface
- Built with modern web technologies
- Designed for learning and demonstration purposes

---

**Enjoy sharing your moments with Quick Reels! 🎥✨**
