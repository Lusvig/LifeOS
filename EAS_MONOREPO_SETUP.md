# EAS Monorepo Configuration - Summary of Changes

This document summarizes the changes made to enable seamless Expo Application Services (EAS) integration with this Turborepo monorepo.

## Problem

EAS tools require `react-native` dependency in the root `package.json` when importing from GitHub. In a monorepo structure, the actual React Native app lives in `apps/mobile`, causing the error:

> "GitHub repository on branch 'main' does not depend on the 'react-native' dependency in 'package.json'."

## Solution Overview

The following changes enable EAS to work properly with the monorepo structure while maintaining clean separation between the desktop and mobile apps.

## Files Created

### 1. `/eas.json` (Root)
**Purpose**: Defines build profiles for EAS builds

**Content**: 
- CLI version requirement (>= 3.0.0)
- Three build profiles: development, preview, production
- Platform-specific configurations for Android and iOS
- Submit configurations for app store deployment

**Key Features**:
- Development profile with internal distribution
- Preview profile for testing
- Production profile for app store releases

### 2. `/.easignore` (Root)
**Purpose**: Instructs EAS which files/directories to include or exclude during builds

**Content**:
- Ignores desktop app (`apps/desktop`)
- Ignores root node_modules cache
- Explicitly includes mobile app and shared packages

### 3. `/apps/mobile/EAS_SETUP.md`
**Purpose**: Comprehensive guide for using EAS with this monorepo

**Content**:
- Step-by-step setup instructions
- Build commands for different profiles
- Submission process to app stores
- Monorepo-specific considerations
- Troubleshooting guide

## Files Modified

### 1. `/package.json` (Root)
**Change**: Added `react-native` to `devDependencies`

```json
"devDependencies": {
  ...
  "react-native": "0.73.0"
}
```

**Reason**: Satisfies EAS requirement for GitHub imports while keeping the dependency as dev-only since it's not actually used at the root level.

### 2. `/apps/mobile/app.json`
**Changes**:
- Added iOS bundle identifier: `"bundleIdentifier": "com.lifeos.app"`
- Added Android package name: `"package": "com.lifeos.app"`
- Added EAS project configuration:
  ```json
  "extra": {
    "eas": {
      "projectId": "your-project-id-here"
    }
  }
  ```

**Reason**: Required for EAS to properly identify and build the app for each platform.

### 3. `/.gitignore` (Root)
**Changes**: Added EAS and Expo-specific ignores:
```
/apps/mobile/dist/
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
.eas.env
```

**Reason**: Prevents sensitive build artifacts and credentials from being committed to the repository.

### 4. `/README.md`
**Change**: Added "EAS Build & Deploy (Mobile)" section

**Content**:
- EAS login and configuration instructions
- Build commands for different profiles
- Submit commands for app stores
- Monorepo configuration notes

## How It Works

1. **GitHub Import**: The root `package.json` now contains `react-native` as a devDependency, satisfying EAS import requirements.

2. **Build Process**: 
   - EAS reads configuration from root `eas.json`
   - EAS automatically detects the Expo app in `apps/mobile` via `app.json`
   - Shared packages (`@lifeos/core`, `@lifeos/ui`) are resolved through pnpm workspaces

3. **Monorepo Structure**: 
   - Root handles orchestration and build profiles
   - `apps/mobile` contains the actual React Native app
   - `packages/*` contain shared code used by both desktop and mobile

## Usage

### First-Time Setup
```bash
# 1. Login to EAS
npx eas login

# 2. Configure project (from mobile directory)
cd apps/mobile && npx eas build:configure

# 3. Update the projectId in apps/mobile/app.json
```

### Building
```bash
# Development build (from root)
npx eas build --profile development --platform android

# Production build (from root)
npx eas build --profile production --platform all
```

### Submitting
```bash
# Submit to app stores (from root)
npx eas submit --platform android
npx eas submit --platform ios
```

## Key Benefits

1. ✅ **EAS GitHub Import**: Works seamlessly with EAS project import from GitHub
2. ✅ **Monorepo Support**: Maintains clean separation between desktop and mobile apps
3. ✅ **Shared Packages**: Properly resolves workspace dependencies during builds
4. ✅ **Standard Workflow**: Uses standard EAS commands without custom scripts
5. ✅ **Type Safety**: Maintains strict TypeScript configuration across all packages

## Next Steps

1. Run `eas build:configure` to get your actual EAS project ID
2. Update `apps/mobile/app.json` with the real `projectId`
3. Configure app signing (certificates, provisioning profiles)
4. Set up EAS secrets for environment variables (Supabase keys, etc.)
5. Run your first build!

## Support

- See `/apps/mobile/EAS_SETUP.md` for detailed setup instructions
- Refer to [EAS Documentation](https://docs.expo.dev/build/introduction/) for advanced configurations
- Check [Expo Monorepo Guide](https://docs.expo.dev/build-reference/how-tos/#how-to-set-up-eas-build-with) for monorepo-specific help
