# EAS Setup Guide for LifeOS Mobile

This guide explains how to set up and use Expo Application Services (EAS) with this monorepo structure.

## Initial Setup

### 1. Install EAS CLI (if not already installed)
```bash
npm install -g eas-cli
```

### 2. Login to EAS
```bash
eas login
```

### 3. Configure EAS Project
From the mobile app directory:
```bash
cd apps/mobile
eas build:configure
```

This will:
- Create or link an EAS project
- Generate a `projectId` that will be added to `app.json`
- Set up your app's bundle identifiers

### 4. Update Bundle Identifiers (if needed)
The default bundle identifiers are:
- iOS: `com.lifeos.app`
- Android: `com.lifeos.app`

You can change these in `apps/mobile/app.json` under `ios.bundleIdentifier` and `android.package`.

## Building

All build profiles are configured in the root `eas.json`:
- **development**: Development client with internal distribution
- **preview**: Internal distribution for testing
- **production**: Production builds for app stores

### Build Commands

Run from the **root directory**:

```bash
# Development build
eas build --profile development --platform android
eas build --profile development --platform ios

# Preview build
eas build --profile preview --platform all

# Production build
eas build --profile production --platform all
```

### Platform-Specific Builds

Android:
```bash
eas build --profile production --platform android
```

iOS:
```bash
eas build --profile production --platform ios
```

## Submitting to App Stores

### Android (Google Play)
```bash
eas submit --platform android
```

### iOS (App Store)
```bash
eas submit --platform ios
```

## Development Workflow

### 1. Development Client
For a better development experience, use the development client:
```bash
# Build development client
eas build --profile development --platform android

# Install on your device, then start the dev server
cd apps/mobile
npm start
```

### 2. Over-the-Air (OTA) Updates
After the initial build, you can push updates without rebuilding:
```bash
eas update --branch production
```

## Monorepo Considerations

This is a Turborepo monorepo with the following structure:
- Root `eas.json`: Build configurations
- `apps/mobile/app.json`: Expo app configuration
- `packages/core`: Shared business logic
- `packages/ui`: Shared UI components (Note: React Native specific components only)

### Important Notes

1. **Working Directory**: EAS builds from the root but knows to look in `apps/mobile` for the Expo app
2. **Dependencies**: The root `package.json` includes `react-native` as a devDependency to satisfy EAS requirements
3. **Workspace Dependencies**: The `@lifeos/core` package is linked via pnpm workspaces
4. **Build Time**: First builds may take 10-20 minutes; subsequent builds are faster with caching

## Troubleshooting

### Build Fails with "Cannot find module"
Make sure all workspace dependencies are properly installed:
```bash
cd /path/to/root
pnpm install
```

### Bundle Identifier Issues
Ensure bundle identifiers in `app.json` match your Apple Developer and Google Play Console settings.

### Environment Variables
Add secrets to EAS:
```bash
eas secret:create --name SUPABASE_URL --value your-url
eas secret:create --name SUPABASE_ANON_KEY --value your-key
```

## Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [EAS Update Documentation](https://docs.expo.dev/eas-update/introduction/)
- [Monorepo Setup](https://docs.expo.dev/build-reference/how-tos/#how-to-set-up-eas-build-with)
