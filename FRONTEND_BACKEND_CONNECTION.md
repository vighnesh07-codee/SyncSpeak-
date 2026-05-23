# Frontend & Backend Connection Guide

## ✅ Setup Complete!

Your frontend and backend are now configured to communicate with each other.

---

## 🚀 Quick Start

### 1. **Start Backend First**
```bash
cd backend
npm run dev
```
Backend will run on: `http://localhost:5000`

### 2. **Start Frontend in New Terminal**
```bash
cd frontend
npm run dev
```
Frontend will run on: `http://localhost:5173`

---

## 📋 Configuration Details

### Backend Configuration
- **Port**: 5000
- **CORS Origin**: http://localhost:5173
- **Socket.io**: Enabled for real-time messaging
- **API Base**: `http://localhost:5000/api`

### Frontend Configuration
- **Port**: 5173 (Vite default)
- **API Base URL**: `http://localhost:5000/api`
- **Socket.io URL**: `http://localhost:5000`
- **Credentials**: Enabled (cookies)

---

## 📁 Key Files

### Frontend
- `src/lib/axios.js` - API client configuration
- `src/store/useAuthStore.js` - Authentication & Socket.io
- `src/store/useChatStore.js` - Chat state management

### Backend
- `src/server.js` - Main server with CORS & Socket.io
- `src/routes/auth.route.js` - Authentication endpoints
- `src/routes/message.route.js` - Message endpoints

---

## 🔗 API Endpoints

### Auth Routes
```
POST   /api/auth/signup      - Create account
POST   /api/auth/login       - Login user
POST   /api/auth/logout      - Logout user
GET    /api/auth/check       - Check auth status
```

### Message Routes
```
GET    /api/message/users    - Get all users
GET    /api/message/chats    - Get chat partners
GET    /api/message/:userId  - Get messages with user
POST   /api/message/send     - Send message
```

---

## 🔌 Socket.io Events

### Server Emits
- `getOnlineUsers` - List of online user IDs
- `newMessage` - New incoming message

### Client Listens
- `getOnlineUsers` - Updates online status
- `newMessage` - Receives new messages in real-time

---

## 🔐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

---

## ✨ Features Enabled

- ✅ User authentication (signup/login/logout)
- ✅ Real-time messaging via Socket.io
- ✅ Online user status
- ✅ Message history
- ✅ CORS support for cross-origin requests
- ✅ Cookie-based session management

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
- Check backend is running on port 5000
- Check CORS origin in backend matches frontend URL
- Clear browser cache and cookies

### Socket.io not connecting
- Ensure backend Socket.io is configured
- Check firewall isn't blocking port 5000
- Verify userId is sent in Socket.io query

### API requests return 401
- Ensure you're authenticated
- Check cookies are being sent
- Verify JWT token is valid

---

## 📊 Data Flow

```
Frontend (React)
    ↓
Axios Client (http://localhost:5000/api)
    ↓
Backend (Express)
    ↓
MongoDB
    ↓
Response back to Frontend

Real-time Communication:
Frontend ↔ Socket.io ↔ Backend
```

---

## 🎯 Next Steps

1. Create MongoDB database
2. Set up environment variables
3. Start backend
4. Start frontend
5. Test signup/login flow
6. Test messaging functionality

Good luck! 🚀
