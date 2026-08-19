import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProfile } from "../features/auth/authAPI";
import MainLayout from "../components/layout/MainLayout";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="p-8 flex justify-center items-center h-full">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-white/10 rounded-full" />
            <div className="h-6 w-32 bg-white/10 rounded-md" />
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="w-full h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8 h-full flex flex-col justify-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/40 overflow-hidden relative"
        >
          {/* Decorative background flare */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">

            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="w-32 h-32 shrink-0 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-5xl font-black shadow-xl shadow-indigo-500/30 transform rotate-3 hover:rotate-0 transition-transform duration-300 cursor-default"
            >
              {user?.name?.charAt(0).toUpperCase()}
            </motion.div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
                {user?.name}
              </h1>

              <p className="text-lg text-slate-400 font-medium mb-4">
                {user?.email}
              </p>

              <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-bold capitalize shadow-inner">
                {user?.role} Access
              </span>
            </div>

          </div>

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">

            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Full Name</p>
              <p className="font-semibold text-lg text-slate-200">{user?.name}</p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Address</p>
              <p className="font-semibold text-lg text-slate-200">{user?.email}</p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Authorization Role</p>
              <p className="font-semibold text-lg text-slate-200 capitalize">
                {user?.role}
              </p>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">System User ID</p>
              <p className="font-mono text-sm text-slate-400 break-all mt-1 bg-black/20 p-2 rounded-lg">
                {user?._id}
              </p>
            </div>

          </div>

        </motion.div>
      </div>
      </div>
    </MainLayout>
  );
};

export default Profile;