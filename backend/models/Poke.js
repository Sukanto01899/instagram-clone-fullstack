const db = require('../config/database');

/**
 * Poke model for handling poke-related database operations
 */
class Poke {
  /**
   * Create a new poke
   * @param {Object} pokeData - Poke data
   * @returns {Object} Created poke
   */
  static async create(pokeData) {
    const poke = {
      fromUserId: pokeData.fromUserId,
      toUserId: pokeData.toUserId,
      createdAt: new Date()
    };
    
    return await db.pokes.insert(poke);
  }
  
  /**
   * Get all pokes for a user
   * @param {String} userId - User ID
   * @returns {Array} Pokes
   */
  static async getUserPokes(userId) {
    return await db.pokes.find({ toUserId: userId }).sort({ createdAt: -1 });
  }
}

module.exports = Poke;