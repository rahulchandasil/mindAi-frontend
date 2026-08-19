import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getUnreadCount,
} from "../../features/notification/notificationApi";

import {
  setUnreadCount,
} from "../../features/notification/notificationSlice";

import NotificationDropdown from "./NotificationDropdown";

const NotificationBell = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { unreadCount } = useSelector(
    (state) => state.notification
  );

  const loadCount = async () => {
    const count =
      await getUnreadCount();

    dispatch(
      setUnreadCount(count)
    );
  };

  useEffect(() => {
    loadCount();

    // Changed from 10s (10000) to 60s (60000) to prevent backend log spam
    const interval = setInterval(
      loadCount,
      60000
    );

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <div className="relative">

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        🔔

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown />
      )}
    </div>
  );
};

export default NotificationBell;