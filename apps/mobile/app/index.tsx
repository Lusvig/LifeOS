import { View, Text } from 'react-native';

export default function Page() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>LifeOS is Working!</Text>
    </View>
  );
}