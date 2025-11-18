import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLifeStore } from '@lifeos/core';
import { Zap, Target, DollarSign } from 'lucide-react-native';

export default function HomeScreen(): JSX.Element {
  const { xp, level } = useLifeStore();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20 }}>
        <Text className="text-4xl font-bold text-white mb-2">Welcome</Text>
        <Text className="text-white/50 mb-8">Mobile Dashboard</Text>

        <View className="glass-panel p-6 rounded-xl mb-4 border border-white/10 bg-zinc-900/60">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white/70">Level</Text>
            <Text className="text-2xl font-bold text-primary">{level}</Text>
          </View>
          <View className="bg-zinc-800 rounded-full h-2 mb-2">
            <View
              className="bg-primary rounded-full h-2"
              style={{ width: `${Math.min((xp % 100) / 100 * 100, 100)}%` }}
            />
          </View>
          <Text className="text-sm text-white/50">{xp} XP total</Text>
        </View>

        <TouchableOpacity className="glass-panel p-6 rounded-xl mb-4 border border-white/10 bg-zinc-900/60">
          <View className="flex-row items-center gap-3">
            <Target size={24} color="#6366f1" />
            <View className="flex-1">
              <Text className="text-white font-semibold">Next Task</Text>
              <Text className="text-white/50 text-sm">Complete project report</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="glass-panel p-6 rounded-xl mb-4 border border-white/10 bg-zinc-900/60">
          <View className="flex-row items-center gap-3">
            <DollarSign size={24} color="#10b981" />
            <View className="flex-1">
              <Text className="text-white font-semibold">Budget Left</Text>
              <Text className="text-white/50 text-sm">$245.50 this month</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="glass-panel p-6 rounded-xl border border-white/10 bg-zinc-900/60">
          <View className="flex-row items-center gap-3">
            <Zap size={24} color="#10b981" />
            <View className="flex-1">
              <Text className="text-white font-semibold">Daily Streak</Text>
              <Text className="text-white/50 text-sm">🔥 7 days</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
