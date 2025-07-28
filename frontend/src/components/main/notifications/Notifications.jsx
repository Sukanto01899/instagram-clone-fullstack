import React from "react";
import NotificationsHeader from "./NotificationsHeader";
import useNotifications from "../../../hooks/useNotifications";
import SingleNotification from "./SingleNotification";

const Notifications = () => {
  const { notifications } = useNotifications();


  return (
    <div className="notifications-container">
      {/* <!-- Header --> */}
      <NotificationsHeader />

      {/* <!-- Notifications List --> */}
      <div className="notifications-list">
        {/* <!-- Today Section --> */}

        {notifications.map((notification) => (
          <SingleNotification key={notification?._id} notification={notification} />
        ))}

        {/* <!-- Padding at bottom for scroll --> */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Notifications;
