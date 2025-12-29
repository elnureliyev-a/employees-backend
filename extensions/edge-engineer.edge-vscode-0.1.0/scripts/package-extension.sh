#!/bin/bash

# Simple script to bump version and package the extension for manual upload

# Check if version type is provided
if [ $# -eq 0 ]; then
  echo "Usage: ./package-extension.sh [patch|minor|major|<specific version>]"
  echo "Example: ./package-extension.sh patch"
  echo "Example: ./package-extension.sh 1.0.0"
  exit 1
fi

VERSION_TYPE=$1

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "Current version: $CURRENT_VERSION"

# Bump version
if [ "$VERSION_TYPE" = "patch" ] || [ "$VERSION_TYPE" = "minor" ] || [ "$VERSION_TYPE" = "major" ]; then
  npm version $VERSION_TYPE --no-git-tag-version
else
  npm version $VERSION_TYPE --no-git-tag-version
fi

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")
echo "New version: $NEW_VERSION"

# Build the extension
echo "Building extension..."
npm run package

# Package the extension
echo "Packaging extension..."
npx vsce package

echo "Done! The packaged extension is available at: edge-vscode-$NEW_VERSION.vsix"
echo "You can now upload this file manually to the VS Code Marketplace." 