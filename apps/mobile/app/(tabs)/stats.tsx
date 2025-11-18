import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useLifeStore } from '@lifeos/core';

export default function StatsScreen(): JSX.Element {
  const { level, xp } = useLifeStore();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
        <Text className="text-4xl font-bold text-white mb-2">Stats</Text>
        <Text className="text-white/50 mb-8">Your Life Metrics</Text>

        <View className="glass-panel p-6 rounded-xl mb-4 border border-white/10 bg-zinc-900/60">
          <Text className="text-white/70 text-sm mb-2">Total Level</Text>
          <Text className="text-4xl font-bold text-primary">{level}</Text>
        </View>

        <View className="glass-panel p-6 rounded-xl mb-4 border border-white/10 bg-zinc-900/60">
          <Text className="text-white/70 text-sm mb-2">Total XP</Text>
          <Text className="text-4xl font-bold text-accent">{xp}</Text>
        </View>

        <View className="glass-panel p-6 rounded-xl border border-white/10 bg-zinc-900/60">
          <View className="mb-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-white/70">Tasks Completed</Text>
              <Text className="font-bold">24</Text>
            </View>
            <View className="bg-zinc-800 rounded-full h-2">
              <View className="bg-primary rounded-full h-2 w-3/4" />
            </View>
          </View>

          <View className="mb-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-white/70">Focus Sessions</Text>
              <Text className="font-bold">12</Text>
            </View>
            <View className="bg-zinc-800 rounded-full h-2">
              <View className="bg-accent rounded-full h-2 w-1/2" />
            </View>
          </View>

          <View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-white/70">Items in Pantry</Text>
              <Text className="font-bold">18</Text>
            </View>
            <View className="bg-zinc-800 rounded-full h-2">
              <View className="bg-blue-500 rounded-full h-2 w-2/3" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
