import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { CameraView } from 'expo-camera';

export default function ScannerScreen(): JSX.Element {
  const [scannedItems, setScannedItems] = useState<string[]>([]);
  const cameraRef = useRef<CameraView>(null);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScannedItems((prev) => [data, ...prev.slice(0, 4)]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 relative">
        <CameraView
          ref={cameraRef}
          className="flex-1"
          onBarcodeScanned={handleBarCodeScanned}
        />

        <View className="absolute inset-0 flex items-center justify-center">
          <View className="w-64 h-64 border-4 border-primary rounded-2xl opacity-50" />
        </View>

        <View className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-6">
          <Text className="text-white text-center mb-4">
            Point camera at barcode
          </Text>

          {scannedItems.length > 0 && (
            <View className="bg-zinc-900/80 rounded-xl p-4 border border-white/10">
              <Text className="text-white/70 text-sm mb-2">Last scanned:</Text>
              {scannedItems.map((item, idx) => (
                <Text key={idx} className="text-white font-mono text-xs mb-1">
                  {item}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
