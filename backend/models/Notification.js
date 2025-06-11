const db = require("../config/database");

/**
 * Notification model for handling notification-related database operations
 */
class Notification {
  /**
   * Create a new notification
   * @param {Object} notificationData - Notification data
   * @returns {Object} Created notification
   */
  static async create(notificationData) {
    const notification = {
      type: notificationData.type, // 'like', 'comment', 'poke'
      userId: notificationData.userId, // recipient
      fromUserId: notificationData.fromUserId,
      postId: notificationData.postId,
      isRead: false,
      createdAt: new Date(),
    };

    return await db.notifications.insert(notification);
  }

  /**
   * Get all notifications for a user
   * @param {String} userId - User ID
   * @returns {Array} Notifications
   */
  static async getUserNotifications(userId) {
    return await db.notifications.find({ userId }, { sort: { createdAt: -1 } });
  }

  /**
   * Mark notification as read
   * @param {String} id - Notification ID
   * @param {String} userId - User ID
   * @returns {Number} Number of updated records
   */
  static async markAsRead(id, userId) {
    return await db.notifications.update({ _id: id, userId }, { $set: { isRead: true } });
  }

  /**
   * Mark notification as unread
   * @param {String} id - Notification ID
   * @param {String} userId - User ID
   * @returns {Number} Number of updated records
   */
  static async markAsUnread(id, userId) {
    return await db.notifications.update({ _id: id, userId }, { $set: { isRead: false } });
  }
}

module.exports = Notification;
