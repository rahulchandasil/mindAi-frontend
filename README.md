# 🧠 MindAI — Backend REST API

A scalable, production-deployed **Node.js & Express** backend powering **MindAI**, a full-stack AI assistant and conversational web application. Built for reliability in production environments, this API handles user authentication, persistent MongoDB-backed session management (`connect-mongo`), chat history persistence, and AI model integration.

🌐 **Live Frontend App:** [https://mind-ai-frontend-snowy.vercel.app/](https://mind-ai-frontend-snowy.vercel.app/)  
🚀 **Live Backend API:** [https://mindai-backend-sdpi.onrender.com](https://mindai-backend-sdpi.onrender.com)

---

## ✨ Key Backend Features

- **AI Prompt & Chat Processing:** Handles real-time user prompts, context formatting, and structured responses from LLM APIs.
- **Production Session Management:** Uses **`connect-mongo`** to store sessions persistently in MongoDB (preventing `MemoryStore` leaks in production).
- **Authentication & User Security:** Secure user registration, login, password hashing (`bcryptjs`), and protected API middleware.
- **Conversation & History Persistence:** Stores and retrieves user chat threads and prompt history cleanly in MongoDB.
- **Cross-Origin Production Setup:** Configured CORS and cookie/session policies for seamless communication with the Vercel-hosted frontend.

---

## 🛠️ Tech Stack

- **Runtime & Framework:** Node.js, Express.js
- **Database & Session Store:** MongoDB, Mongoose ODM, `connect-mongo`
- **AI Integration:** LLM / Generative AI REST API
- **Security & Middleware:** `express-session` / JWT, `bcryptjs`, `cors`, `dotenv`
- **Deployment:** Render Cloud

---

## 📂 Project Structure

```text
mindAi-backend/
├── src/
│   ├── config/         # MongoDB & AI service configurations
│   ├── controllers/    # Route handlers (Auth, AI Chat, History)
│   ├── middleware/     # Authentication & error-handling middleware
│   ├── models/         # Mongoose schemas (User, Chat/Conversation)
│   └── routes/         # Express API endpoint definitions
├── .gitignore
├── package.json
└── server.js           # Application entry point & session store setup
```

---

## 🔌 Core API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user account | Public |
| `POST` | `/api/auth/login` | Authenticate user & initialize persistent session | Public |
| `POST` | `/api/auth/logout` | Destroy active user session | Authenticated |
| `POST` | `/api/ai/chat` | Send prompt to AI model and receive response | Authenticated |
| `GET` | `/api/ai/history` | Retrieve saved user conversation history | Authenticated |

---

## 🚀 Run Locally

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas URI
- AI Provider API Key

### 1. Clone the Repository
```bash
git clone https://github.com
cd mindAi-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_or_jwt_secret
AI_API_KEY=your_ai_provider_api_key
CLIENT_URL=http://localhost:5173


### 4. Start the Server
bash
npm start
# Or for development with nodemon:
npm run dev


---

## 👨‍💻 Author

**Rahul Chanda Sil**  
- **GitHub:** [@rahulchandasil](https://github.com)  
- **LinkedIn:** [Rahul Chanda Sil](https://linkedin.com)  
- **Location:** Kolkata, West Bengal, India
