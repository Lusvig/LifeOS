import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MANUAL ENTRY WORKING!</Text>
      <Text style={styles.subtext}>If you see this, the app is fixed.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' },
  text: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  subtext: { color: 'white', marginTop: 10 }
});
