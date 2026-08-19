import { useEffect, useState } from "react";
import { getUsers, updateRole } from "../features/admin/adminApi";
import MainLayout from "../components/layout/MainLayout";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await getUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId, role) => {
    setUpdatingUserId(userId);
    try {
      await updateRole(userId, role);
      // Optimistic local state update to prevent a harsh full-page flash reloading everything
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role } : user
        )
      );
    } catch (error) {
      console.error("Failed to update role:", error);
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <MainLayout>
      <div className="flex-1 overflow-y-auto min-h-0 dynamic-scrollbar p-6 lg:p-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-white/5">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                User Management
              </h1>
              <p className="mt-2 text-sm text-indigo-200/70">
                Manage system permissions, roles, and user access levels.
              </p>
            </div>
            <div className="text-sm font-semibold text-slate-300 bg-slate-800/80 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-xl shadow-lg self-start sm:self-auto flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Total Users: <span className="text-white font-bold ml-1">{users.length}</span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-slate-800/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            {isLoading ? (
              /* Premium Loading Skeleton State */
              <div className="p-6 space-y-4 divide-y divide-white/5">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex justify-between items-center pt-4 first:pt-0 animate-pulse">
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-slate-700/50 rounded"></div>
                      <div className="h-3 w-48 bg-slate-700/30 rounded"></div>
                    </div>
                    <div className="h-9 w-28 bg-slate-700/50 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : users.length === 0 ? (
              <div className="p-16 text-center">
                <p className="text-slate-400 font-medium">No users found.</p>
              </div>
            ) : (
              <>
                {/* Desktop View (Table format - Hidden on small mobile screens) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900/50 border-b border-white/5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <th className="py-5 px-8">User Info</th>
                        <th className="py-5 px-8">Current Designation</th>
                        <th className="py-5 px-8 text-right">Access Control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {users.map((user) => (
                        <tr key={user._id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-5 px-8">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-md">
                                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                              </div>
                              <div>
                                <div className="font-bold text-white text-base">{user.name}</div>
                                <div className="text-xs text-indigo-300/70 mt-0.5">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-8">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
                                user.role === "admin"
                                  ? "bg-red-500/10 text-red-400 border-red-500/20"
                                  : user.role === "therapist"
                                  ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                  : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="py-5 px-8 text-right">
                            <select
                              disabled={updatingUserId === user._id}
                              value={user.role}
                              onChange={(e) => handleRoleChange(user._id, e.target.value)}
                              className="text-sm bg-slate-900/80 border border-white/10 rounded-xl px-4 py-2.5 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                              <option className="bg-slate-900 text-white" value="user">User</option>
                              <option className="bg-slate-900 text-white" value="therapist">Therapist</option>
                              <option className="bg-slate-900 text-white" value="admin">Admin</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View (Card List layout - Hidden on Desktop screens) */}
                <div className="block md:hidden divide-y divide-white/5">
                  {users.map((user) => (
                    <div key={user._id} className="p-6 flex flex-col gap-5 hover:bg-white/[0.02] transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-md">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-base">{user.name}</h3>
                            <p className="text-xs text-indigo-300/70 mt-0.5">{user.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
                            user.role === "admin"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : user.role === "therapist"
                              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}
                        >
                          {user.role}
                        </span>
                        <select
                          disabled={updatingUserId === user._id}
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="text-sm bg-slate-900/80 border border-white/10 rounded-lg px-3 py-2 text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 cursor-pointer disabled:opacity-50"
                        >
                          <option value="user">User</option>
                          <option value="therapist">Therapist</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserManagement;