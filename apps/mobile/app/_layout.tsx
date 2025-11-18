import { Stack } from 'expo-router';

export default function RootLayout(): JSX.Element {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="quick-add" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
