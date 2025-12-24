const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

async function copyFiles() {
  try {
    // Find where server.js is located (handles both local and CI environments)
    const findCommand =
      'find .next/standalone -name "server.js" -not -path "*/node_modules/*" | head -1';
    const serverJsPath = execSync(findCommand, { encoding: "utf-8" }).trim();

    if (!serverJsPath) {
      throw new Error("Could not find server.js in .next/standalone");
    }

    // Get the directory containing server.js
    const standaloneBaseDir = path.dirname(serverJsPath);
    console.log(`Found standalone directory at: ${standaloneBaseDir}`);

    // Copy static files
    const staticSrcPath = path.join(__dirname, ".next/static");
    const staticDestPath = path.join(standaloneBaseDir, ".next/static");
    await fs.copy(staticSrcPath, staticDestPath);
    console.log("Static files copied successfully.");

    // Copy public files
    const publicSrcPath = path.join(__dirname, "public");
    const publicDestPath = path.join(standaloneBaseDir, "public");
    await fs.copy(publicSrcPath, publicDestPath);
    console.log("Public files copied successfully.");

    // Verify game directories were copied
    const tetrisPath = path.join(publicDestPath, "tetris");
    const jsSpeccyPath = path.join(publicDestPath, "jsspeccy");
    const romsPath = path.join(publicDestPath, "roms");

    if (await fs.pathExists(tetrisPath)) {
      console.log("✓ Tetris files copied");
    } else {
      console.warn("⚠ Tetris directory not found!");
    }

    if (await fs.pathExists(jsSpeccyPath)) {
      console.log("✓ JSSpeccy files copied");
    } else {
      console.warn("⚠ JSSpeccy directory not found!");
    }

    if (await fs.pathExists(romsPath)) {
      console.log("✓ Roms directory copied");
    } else {
      console.warn("⚠ Roms directory not found!");
    }
  } catch (error) {
    console.error("Error during post-build copy:", error);
    process.exit(1);
  }
}

copyFiles();
