const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

const cleanDatabase = () => {
  console.log("🧹 Cleaning database files...");

  const dataDir = path.join(__dirname, "../data");
  const dbFiles = ["users.db", "posts.db", "comments.db", "notifications.db", "pokes.db", "tokens.db"];

  let removedCount = 0;

  dbFiles.forEach((file) => {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ Removed: ${file}`);
      removedCount++;
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

  const files = fs.readdirSync(uploadsDir);

  if (files.length === 0) {
    console.log("📁 Uploads directory is already empty");
    return 0;
  }

  let removedCount = 0;
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

const showStats = () => {
  const dataDir = path.join(__dirname, "../data");
  const uploadsDir = path.join(__dirname, "../uploads");

  console.log("📊 Current Status:");

  // Check database files
  const dbFiles = ["users.db", "posts.db", "comments.db", "notifications.db", "pokes.db", "tokens.db"];
  const existingDbFiles = dbFiles.filter((file) => fs.existsSync(path.join(dataDir, file)));
  console.log(`   Database files: ${existingDbFiles.length}/${dbFiles.length}`);
  if (existingDbFiles.length > 0) {
    console.log(`   Files found: ${existingDbFiles.join(", ")}`);
  }

  // Check upload files
  let uploadCount = 0;
  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir);
    uploadCount = files.filter((file) => fs.statSync(path.join(uploadsDir, file)).isFile()).length;
  }
  console.log(`   Uploaded files: ${uploadCount}`);
  console.log("");
};

const main = async () => {
  console.log("🚀 Photo Booth Database Cleaner\n");

  showStats();

  const answer = await question("❓ Are you sure you want to clean all data? This cannot be undone! (yes/no): ");

  if (answer.toLowerCase() !== "yes" && answer.toLowerCase() !== "y") {
    console.log("❌ Cleanup cancelled");
    rl.close();
    return;
  }

  console.log("");

  try {
    cleanDatabase();
    console.log("");
    cleanUploads();
    console.log("");

    // Ensure directories exist
    const dataDir = path.join(__dirname, "../data");
    const uploadsDir = path.join(__dirname, "../uploads");

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
      console.log("✅ Created data directory");
    }

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log("✅ Created uploads directory");
    }

    console.log("🎉 Cleanup completed successfully!");
    console.log("💡 You can now start the server with a fresh database");
    console.log('🔧 Run "npm run dev" to start the development server');
  } catch (error) {
    console.error("❌ Error during cleanup:", error.message);
  }

  rl.close();
};

// Run the cleanup if this script is executed directly
if (require.main === module) {
  main();
}
