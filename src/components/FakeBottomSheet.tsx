import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;

interface FakeBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
}

export default function FakeBottomSheet({
  visible,
  onClose,
  title,
}: FakeBottomSheetProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      accessible
      accessibilityLabel="Fake bottom sheet modal"
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={onClose}
      />
      <View style={styles.sheet}>
        <Text style={styles.title}>{title}</Text>
        {/* Aqui você pode incluir seu form futuramente */}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000055',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: screenHeight * 0.4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});