const Datastore = require("nedb");
const path = require("path");

// Initialize the databases
const db = {
  users: new Datastore({ filename: path.join(__dirname, "../data/users.db"), autoload: true }),
  posts: new Datastore({ filename: path.join(__dirname, "../data/posts.db"), autoload: true }),
  comments: new Datastore({ filename: path.join(__dirname, "../data/comments.db"), autoload: true }),
  notifications: new Datastore({ filename: path.join(__dirname, "../data/notifications.db"), autoload: true }),
  pokes: new Datastore({ filename: path.join(__dirname, "../data/pokes.db"), autoload: true }),
  tokens: new Datastore({ filename: path.join(__dirname, "../data/tokens.db"), autoload: true }),
};

// Create indexes
db.users.ensureIndex({ fieldName: "email", unique: true });
db.posts.ensureIndex({ fieldName: "userId" });
db.comments.ensureIndex({ fieldName: "postId" });
db.notifications.ensureIndex({ fieldName: "userId" });
db.pokes.ensureIndex({ fieldName: "toUserId" });

// Create a helper function to promisify NeDB operations
const promisifyDb = (db) => {
  return {
    find: (query, params = {}) => {
      return new Promise((resolve, reject) => {
        let queryChain = db.find(query);

        // Apply sort if provided
        if (params.sort && typeof params.sort === "object") {
          queryChain = queryChain.sort(params.sort);
        }

        // Apply skip if provided
        if (typeof params.skip === "number" && params.skip >= 0) {
          queryChain = queryChain.skip(params.skip);
        }

        // Apply limit if provided
        if (typeof params.limit === "number" && params.limit >= 0) {
          queryChain = queryChain.limit(params.limit);
        }

        queryChain.exec((err, docs) => {
          if (err) return reject(err);
          resolve(docs);
        });
      });
    },
    findWithSort: (query, sort, skip, limit) => {
      return new Promise((resolve, reject) => {
        db.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .exec((err, docs) => {
            if (err) return reject(err);
            resolve(docs);
          });
      });
    },
    findOne: (query) => {
      return new Promise((resolve, reject) => {
        db.findOne(query, (err, doc) => {
          if (err) return reject(err);
          resolve(doc);
        });
      });
    },
    insert: (doc) => {
      return new Promise((resolve, reject) => {
        db.insert(doc, (err, newDoc) => {
          if (err) return reject(err);
          resolve(newDoc);
        });
      });
    },
    update: (query, update, options = {}) => {
      return new Promise((resolve, reject) => {
        db.update(query, update, options, (err, numAffected) => {
          if (err) return reject(err);
          resolve(numAffected);
        });
      });
    },
    remove: (query, options = {}) => {
      return new Promise((resolve, reject) => {
        db.remove(query, options, (err, numRemoved) => {
          if (err) return reject(err);
          resolve(numRemoved);
        });
      });
    },
  };
};

// Create data directory if it doesn't exist
const fs = require("fs");
const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Export the promisified databases
module.exports = {
  users: promisifyDb(db.users),
  posts: promisifyDb(db.posts),
  comments: promisifyDb(db.comments),
  notifications: promisifyDb(db.notifications),
  pokes: promisifyDb(db.pokes),
  tokens: promisifyDb(db.tokens),
};
