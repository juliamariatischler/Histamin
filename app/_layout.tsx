import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { initializeDatabase } from '../src/database/database';

export default function RootLayout() {
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#F5F3EC' }, headerTintColor: '#27352F' }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="meal" options={{ title: 'Mahlzeit eintragen' }} />
      <Stack.Screen name="checkin" options={{ title: 'Stimmung & Energie' }} />
      <Stack.Screen name="symptoms" options={{ title: 'Symptome erfassen' }} />
    </Stack>
  );
}
