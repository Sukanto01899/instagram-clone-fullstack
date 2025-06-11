const Notification = require('../models/Notification');
const User = require('../models/User');

/**
 * Get all notifications for the current user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.getUserNotifications(req.user._id);
    
    // Get user data for each notification
    const notificationsWithUserData = await Promise.all(notifications.map(async (notification) => {
      const user = await User.findById(notification.fromUserId);
      const { password, ...userWithoutPassword } = user || { name: 'Unknown', avatar: null };
      return {
        ...notification,
        fromUser: userWithoutPassword
      };
    }));
    
    res.json(notificationsWithUserData);
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Mark a notification as read
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Mark notification as read
    const updated = await Notification.markAsRead(id, req.user._id);
    
    if (updated === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Mark a notification as unread
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 */
const markAsUnread = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Mark notification as unread
    const updated = await Notification.markAsUnread(id, req.user._id);
    
    if (updated === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.json({ message: 'Notification marked as unread' });
  } catch (error) {
    console.error('Mark as unread error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAsUnread
};