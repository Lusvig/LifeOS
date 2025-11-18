import { View, Text, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { DollarSign, CheckCircle, FileText, X } from 'lucide-react-native';

export default function QuickAddModal(): JSX.Element {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal transparent animationType="slide">
      <SafeAreaView className="flex-1 bg-black/50 justify-end">
        <View className="bg-surface rounded-t-3xl p-6 pb-12">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-white">Quick Add</Text>
            <TouchableOpacity
              onPress={handleClose}
              className="p-2 bg-white/10 rounded-full"
            >
              <X size={24} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="glass-panel p-6 rounded-2xl mb-4 border border-white/10 bg-zinc-900/60 flex-row items-center gap-4">
            <View className="bg-primary/20 p-4 rounded-xl">
              <DollarSign size={32} color="#6366f1" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">Spent Money</Text>
              <Text className="text-white/50 text-sm">Log a transaction</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="glass-panel p-6 rounded-2xl mb-4 border border-white/10 bg-zinc-900/60 flex-row items-center gap-4">
            <View className="bg-accent/20 p-4 rounded-xl">
              <CheckCircle size={32} color="#10b981" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">New Task</Text>
              <Text className="text-white/50 text-sm">Add to your list</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="glass-panel p-6 rounded-2xl border border-white/10 bg-zinc-900/60 flex-row items-center gap-4">
            <View className="bg-blue-500/20 p-4 rounded-xl">
              <FileText size={32} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className="text-white font-bold text-lg">Quick Note</Text>
              <Text className="text-white/50 text-sm">Capture an idea</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
