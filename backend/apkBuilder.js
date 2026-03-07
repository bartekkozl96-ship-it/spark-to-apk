// backend/apkBuilder.js
// This script compiles Flutter projects to APK using Flutter CLI.

const { exec } = require('child_process');

// Function to build APK
const buildAPK = (projectPath) => {
    exec(`flutter build apk --release`, { cwd: projectPath }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error building APK: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`APK built successfully: ${stdout}`);
    });
};

// Usage
// Replace 'your_project_path' with the actual path to the Flutter project.
// buildAPK('your_project_path');

module.exports = buildAPK;
