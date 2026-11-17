# 🧠 MindAI — AI Assistant & Conversational Web App (Frontend)

A modern, responsive **React + Vite** frontend for **MindAI**, a full-stack AI conversational assistant. Designed for clean real-time user interaction, it enables users to sign in securely, submit prompts, view structured AI responses, and manage persistent conversation threads seamlessly across sessions.

🌐 **Live Demo:** [https://vercel.app](https://vercel.app)  
⚙️ **Backend Repository:** [mindAi-backend](https://github.com)

---

## ✨ Key Frontend Features

- **Real-Time AI Chat Interface:** Clean, responsive prompt input and conversational UI for interacting with AI models smoothly.
- **Persistent Chat History:** Browse, revisit, and continue previous conversation threads synced with the MongoDB backend.
- **Authentication & Protected Routes:** Secure user registration, login, and session persistence with protected chat views.
- **Formatted AI Responses:** Clean rendering of AI-generated answers, code blocks, and structured outputs.
- **Responsive Design:** Optimized for seamless use across desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React.js (Vite)
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS / CSS3
- **API Integration:** Axios (with credentials/session support connected to Node.js & Express backend)
- **Deployment:** Vercel

---

## 📂 Project Structure

```text
mindAi-frontend/
├── public/                 # Static assets & icons
├── src/
│   ├── assets/             # UI media & branding
│   ├── components/         # Reusable components (ChatWindow, Sidebar, MessageBubble, Navbar)
│   ├── context/            # Global state management (Auth & Chat state)
│   ├── pages/              # Login, Register, AI Chat Dashboard
│   ├── services/           # Axios API client & endpoint calls
│   ├── App.jsx             # Main application routing
│   └── main.jsx            # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- Running instance of [mindAi-backend](https://github.com)

### 1. Clone the Repository
```bash
git clone https://github.com
cd mindAi-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your backend API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## 📸 Screenshots

*(Drag and drop 1–2 screenshots of your live MindAI chat interface right here in the GitHub editor!)*

---

## 👨‍💻 Author

**Rahul Chanda Sil**  
- **GitHub:** [@rahulchandasil](https://github.com)  
- **LinkedIn:** [Rahul Chanda Sil](https://linkedin.com)  
- **Location:** Kolkata, West Bengal, India
