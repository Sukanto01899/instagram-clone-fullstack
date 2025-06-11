/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  // Check if the error is a validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  // Check if the error is a duplicate key error
  if (err.name === "MongoError" && err.code === 11000) {
    return res.status(400).json({ message: "Duplicate key error" });
  }

  // Default error message
  res.status(500).json({ message: "Internal server error" });
};

module.exports = { errorHandler };
