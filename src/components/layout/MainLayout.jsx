import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-slate-900 text-slate-100 font-sans relative overflow-hidden">
      {/* Ambient glowing background shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col flex-1 w-full h-full overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden bg-slate-900/50 backdrop-blur-3xl rounded-tl-3xl border-t border-l border-white/5 shadow-2xl relative">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;