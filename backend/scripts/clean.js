const fs = require("fs");
const path = require("path");

/**
 * Clean script to remove database files and uploaded files
 * This will reset the application to a fresh state
 */

const cleanDatabase = () => {
  console.log("🧹 Cleaning database files...");

  const dataDir = path.join(__dirname, "../data");
  const dbFiles = ["users.db", "posts.db", "comments.db", "notifications.db", "pokes.db", "tokens.db"];

  let removedCount = 0;

  // Remove database files
  dbFiles.forEach((file) => {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ Removed: ${file}`);
      removedCount++;
    } else {
      console.log(`⚠️  File not found: ${file}`);
    }
  });

  console.log(`✨ Database cleanup completed! (${removedCount} files removed)`);
};

const cleanUploads = () => {
  console.log("🧹 Cleaning uploaded files...");

  const uploadsDir = path.join(__dirname, "../uploads");

  if (!fs.existsSync(uploadsDir)) {
    console.log("⚠️  Uploads directory does not exist");
    return 0;
  }

  // Read all files in uploads directory
  const files = fs.readdirSync(uploadsDir);

  if (files.length === 0) {
    console.log("📁 Uploads directory is already empty");
    return 0;
  }

  let removedCount = 0;
  // Remove all files in uploads directory
  files.forEach((file) => {
    const filePath = path.join(uploadsDir, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      fs.unlinkSync(filePath);
      console.log(`✅ Removed: ${file}`);
      removedCount++;
    }
  });

  console.log(`✨ Uploads cleanup completed! (${removedCount} files removed)`);
  return removedCount;
};

const createDirectories = () => {
  console.log("📁 Ensuring directories exist...");

  const dataDir = path.join(__dirname, "../data");
  const uploadsDir = path.join(__dirname, "../uploads");

  // Create data directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log("✅ Created data directory");
  }

  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log("✅ Created uploads directory");
  }

  console.log("✨ Directories ready!");
};

const main = () => {
  console.log("🚀 Starting cleanup process...\n");

  try {
    cleanDatabase();
    console.log("");
    cleanUploads();
    console.log("");
    createDirectories();
    console.log("");
    console.log("🎉 Cleanup completed successfully!");
    console.log("💡 You can now start the server with a fresh database");
    console.log('🔧 Run "npm run dev" to start the development server');
  } catch (error) {
    console.error("❌ Error during cleanup:", error.message);
    process.exit(1);
  }
};

// Run the cleanup if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = {
  cleanDatabase,
  cleanUploads,
  createDirectories,
  main,
};
