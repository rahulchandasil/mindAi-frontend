import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  // Structural SVG icon definition schema to avoid layout pollution
  const icons = {
    chat: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    history: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    profile: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    dashboard: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zm10 0a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>,
    alerts: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.033 6.033 0 00-4.502-5.857M17 20H7m10 0a3 3 0 11-6 0m6 0H9m2-3.414V11a6.033 6.033 0 00-4.502-5.857M9 11H5m3 0h3m2 0h3m-3 4h.01M9 16h.01" /></svg>,
    users: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    therapists: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    analytics: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm4 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  };

  // Centralized navigation map dynamically distributed by role clearance levels
  const navigationMap = {
   user: [
  { name: "New Chat", path: "/chat", icon: icons.chat },
  { name: "Conversations", path: "/history", icon: icons.history },
  { name: "Mood Analytics", path: "/analytics", icon: icons.analytics },
  { name: "Profile Settings", path: "/profile", icon: icons.profile },
],
    therapist: [
      { name: "Therapist Dashboard", path: "/therapist", icon: icons.dashboard },
    ],
    admin: [
      { name: "System Control", path: "/admin", icon: icons.dashboard },
      { name: "Manage Users", path: "/admin/users", icon: icons.users },
      { name: "Manage Alerts", path: "/admin/alerts", icon: icons.alerts },
      { name: "System Analytics", path: "/analytics", icon: icons.analytics },
    ],
  };

  const currentRoutes = navigationMap[user?.role] || [];

  return (
    <motion.aside 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="w-64 border-r border-white/5 bg-slate-900/40 backdrop-blur-md flex flex-col h-full shrink-0 select-none relative z-10"
    >
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        
        {/* Dynamic Context Group */}
        {currentRoutes.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 block mb-3">
              {user?.role} Workspace
            </span>
            <div className="p-4 border border-white/5 rounded-2xl bg-white/5 mb-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-500/20">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
            
                <div className="overflow-hidden">
                  <h3 className="font-semibold text-slate-200 truncate">
                    {user?.name}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-indigo-400 capitalize mt-0.5 font-medium">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>
            
            <nav className="space-y-1.5">
              {currentRoutes.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border
                    ${isActive
                      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300 shadow-sm shadow-indigo-500/5"
                      : "bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200 hover:border-white/10"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <span className={`shrink-0 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                        {link.icon}
                      </span>
                      <span>{link.name}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        )}

      </div>
    </motion.aside>
  );
};

export default Sidebar;