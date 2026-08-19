import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import NotificationBell from "../common/NotificationBell";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-20 bg-slate-900/40 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 z-50 sticky top-0 shrink-0"
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-3 group relative"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 transform group-hover:scale-105">
          M
        </div>
        <span className="text-xl font-extrabold text-white tracking-tight group-hover:text-indigo-200 transition-colors">
          MindAI
        </span>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <NotificationBell />

        {/* User Info */}
        <div className="flex items-center gap-4 border-r border-white/10 pr-6">
          <div className="hidden sm:block text-right">
            <p className="font-semibold text-slate-200 text-sm">
              {user?.name}
            </p>
            <p className="text-xs text-indigo-400 capitalize font-medium">
              {user?.role}
            </p>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-300 shadow-inner">
            {userInitial}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all duration-300 text-sm font-semibold flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>

      </div>
    </motion.header>
  );
};

export default Navbar;