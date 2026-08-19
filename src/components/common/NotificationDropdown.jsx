import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getNotifications,
  getUnreadCount,
  markAllAsRead,
} from "../../features/notification/notificationApi";

import {
  setLoading,
  setNotifications,
  setUnreadCount,
  setError,
} from "../../features/notification/notificationSlice";

import NotificationItem from "./NotificationItem";

const NotificationDropdown = () => {
  const dispatch = useDispatch();

  const {
    notifications,
    unreadCount,
  } = useSelector(
    (state) => state.notification
  );

  const loadNotifications = async () => {
    try {
      dispatch(setLoading());

      const data = await getNotifications();

      dispatch(setNotifications(data));

      const count = await getUnreadCount();

      dispatch(setUnreadCount(count));
    } catch (err) {
      dispatch(
        setError(
          err.response?.data?.message
        )
      );
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleReadAll = async () => {
    await markAllAsRead();
    loadNotifications();
  };

  return (
    <div className="absolute right-0 top-14 w-96 bg-white rounded-xl shadow-2xl border z-50">

      <div className="flex justify-between items-center p-4 border-b">

        <h2 className="font-bold text-lg">
          Notifications
        </h2>

        {unreadCount > 0 && (
          <button
            onClick={handleReadAll}
            className="text-blue-600 text-sm"
          >
            Mark all read
          </button>
        )}

      </div>

      <div className="max-h-96 overflow-y-auto">

        {notifications.length === 0 && (
          <div className="text-center p-10 text-gray-500">
            No Notifications
          </div>
        )}

        {notifications.map((item) => (
          <NotificationItem
            key={item._id}
            notification={item}
            refreshNotifications={loadNotifications}
          />
        ))}

      </div>
    </div>
  );
};

export default NotificationDropdown;