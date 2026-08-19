import {
  markAsRead,
  deleteNotification,
} from "../../features/notification/notificationApi";

const NotificationItem = ({
  notification,
  refreshNotifications,
}) => {
  const handleRead = async () => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
      refreshNotifications();
    }
  };

  const handleDelete = async () => {
    await deleteNotification(notification._id);
    refreshNotifications();
  };

  return (
    <div
      onClick={handleRead}
      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
        !notification.isRead ? "bg-blue-50" : ""
      }`}
    >
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">
            {notification.title}
          </h3>

          <p className="text-sm text-gray-600 mt-1">
            {notification.message}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            {new Date(
              notification.createdAt
            ).toLocaleString()}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="text-red-500"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;