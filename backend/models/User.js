const bcrypt = require('bcrypt');
const db = require('../config/database');

/**
 * User model for handling user-related database operations
 */
class User {
  /**
   * Create a new user
   * @param {Object} userData - User data (name, email, password)
   * @returns {Object} Created user
   */
  static async create(userData) {
    // Check if email already exists
    const existingUser = await db.users.findOne({ email: userData.email });
    
    if (existingUser) {
      throw new Error('Email already in use');
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    // Create user
    const user = await db.users.insert({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      avatar: null,
      bio: '',
      createdAt: new Date()
    });
    
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  /**
   * Find a user by email
   * @param {String} email - User email
   * @returns {Object} Found user
   */
  static async findByEmail(email) {
    return await db.users.findOne({ email });
  }
  
  /**
   * Find a user by ID
   * @param {String} id - User ID
   * @returns {Object} Found user
   */
  static async findById(id) {
    return await db.users.findOne({ _id: id });
  }
  
  /**
   * Update user profile
   * @param {String} id - User ID
   * @param {Object} updateData - Data to update
   * @returns {Number} Number of updated records
   */
  static async update(id, updateData) {
    return await db.users.update(
      { _id: id },
      { $set: updateData }
    );
  }
  
  /**
   * Update user avatar
   * @param {String} id - User ID
   * @param {String} avatarPath - Path to avatar
   * @returns {Number} Number of updated records
   */
  static async updateAvatar(id, avatarPath) {
    return await db.users.update(
      { _id: id },
      { $set: { avatar: avatarPath } }
    );
  }
  
  /**
   * Compare provided password with stored hash
   * @param {String} password - Plain text password
   * @param {String} hashedPassword - Hashed password
   * @returns {Boolean} Whether passwords match
   */
  static async comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = User;