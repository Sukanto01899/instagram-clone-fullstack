import React from "react";
import NotificationsHeader from "./NotificationsHeader";
import useNotifications from "../../../hooks/useNotifications";
import SingleNotification from "./SingleNotification";
import LoaderItem from "../../Loader/notifications-loader/LoaderItem";
import NotificationsLoading from "../../Loader/notifications-loader/NotificationsLoading";

const Notifications = () => {
  const { notifications, isLoading, isSuccess } = useNotifications();


  return (
    <div className="notifications-container">
      {/* <!-- Header --> */}
      <NotificationsHeader />

      {/* <!-- Notifications List --> */}
      <div className="notifications-list">
        {/* <!-- Today Section --> */}

        {
          isLoading && <NotificationsLoading/>
        }

        { (!isLoading || isSuccess) && notifications.map((notification) => (
          <SingleNotification key={notification?._id} notification={notification} />
        ))}

        {/* <!-- Padding at bottom for scroll --> */}
        <div className="h-20"></div>
      </div>
    </div>
  );
};

export default Notifications;
