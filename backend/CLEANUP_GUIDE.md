# Database Cleanup Scripts

This project includes several scripts to help you clean and reset the database during development.

## Available Commands

### `npm run clean`
- **Description**: Automatically cleans all database files and uploaded files
- **Use case**: Quick reset without confirmation
- **Warning**: ⚠️ This will permanently delete all data!

```bash
npm run clean
```

### `npm run clean:safe`
- **Description**: Interactive cleanup with confirmation prompt
- **Use case**: Safe cleanup with confirmation step
- **Features**: Shows current stats before cleaning

```bash
npm run clean:safe
```

### `npm run clean:dev`
- **Description**: Cleans database and immediately starts development server
- **Use case**: Quick reset and restart for development

```bash
npm run clean:dev
```

### `npm run reset`
- **Description**: Alias for `clean:safe` - interactive cleanup
- **Use case**: When you want to be extra careful

```bash
npm run reset
```

## What Gets Cleaned

### Database Files
- `users.db` - All user accounts and profiles
- `posts.db` - All posts and captions
- `comments.db` - All comments on posts
- `notifications.db` - All notifications
- `pokes.db` - All poke interactions
- `tokens.db` - All JWT refresh tokens

### Uploaded Files
- All images in the `uploads/` directory
- Profile avatars
- Post images

## Safety Features

- The interactive version (`clean:safe`) shows current stats
- Confirmation prompt prevents accidental deletion
- Directories are recreated after cleanup
- Error handling for missing files/directories

## Example Usage

```bash
# Check what will be deleted first
npm run clean:safe

# Quick cleanup (no confirmation)
npm run clean

# Reset and start developing immediately
npm run clean:dev
```

## Development Workflow

1. **Testing Authentication**: Use `npm run clean` to test user registration/login flows
2. **Testing Posts**: Reset to test post creation and interactions
3. **Testing Notifications**: Clean to verify notification generation
4. **Before Demos**: Use `npm run reset` for a fresh demo environment

## Sample Output

### Interactive Clean (`npm run clean:safe`)
```
🚀 Photo Booth Database Cleaner

📊 Current Status:
   Database files: 6/6
   Files found: users.db, posts.db, comments.db, notifications.db, pokes.db, tokens.db
   Uploaded files: 13

❓ Are you sure you want to clean all data? This cannot be undone! (yes/no): yes

🧹 Cleaning database files...
✅ Removed: users.db
✅ Removed: posts.db
✅ Removed: comments.db
✅ Removed: notifications.db
✅ Removed: pokes.db
✅ Removed: tokens.db
✨ Database cleanup completed! (6 files removed)

🧹 Cleaning uploaded files...
✅ Removed: 1d02672c-2b90-400b-b1a2-c9860eab560c.jpg
✅ Removed: 291f473c-b9cb-4b5d-9dc9-e474c8843233.jpg
... (and more files)
✨ Uploads cleanup completed! (13 files removed)

🎉 Cleanup completed successfully!
💡 You can now start the server with a fresh database
🔧 Run "npm run dev" to start the development server
```

### Quick Clean (`npm run clean`)
```
🚀 Starting cleanup process...

🧹 Cleaning database files...
✅ Removed: users.db
✅ Removed: posts.db
✅ Removed: comments.db
✅ Removed: notifications.db
✅ Removed: pokes.db
✅ Removed: tokens.db
✨ Database cleanup completed! (6 files removed)

🧹 Cleaning uploaded files...
✅ Removed: avatar1.jpg
✅ Removed: post1.png
✨ Uploads cleanup completed! (2 files removed)

📁 Ensuring directories exist...
✨ Directories ready!

🎉 Cleanup completed successfully!
💡 You can now start the server with a fresh database
🔧 Run "npm run dev" to start the development server
```

## File Structure After Cleanup

```
backend/
├── data/           # Empty directory (recreated)
├── uploads/        # Empty directory (recreated)
└── scripts/
    ├── clean.js              # Quick cleanup script
    └── clean-interactive.js  # Safe cleanup script
```

## Notes

- Scripts automatically recreate the `data/` and `uploads/` directories
- All database files use the NeDB format (.db files)
- Uploaded files are typically images with UUID filenames
- Perfect for testing refresh token flows and authentication systems
