import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import PrimaryButton from './PrimaryButton';
import colors from '../theme/colors';
import typography from '../theme/typography';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/types';

const CATEGORIES = ['Iniciante', 'D', 'C', 'B', 'A'];
const CATEGORY_ORDER = {
  'Iniciante': 0,
  'Cat. D': 1,
  'Cat. C': 2,
  'Cat. B': 3,
  'Cat. A': 4,
};

export default function EditCategoriaModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { user, refreshUser } = useAuth();
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSubmit = async () => {
    if (!selected) return;

    try {
      setLoading(true);
      await axios.patch('https://x8ki-letl-twmt.n7.xano.io/api:pkbVGZBj/editarCategoria', {
        users_id: user?.id,
        category_current: selected,
        category_edit: true,
      });
      await refreshUser();
      Alert.alert('Sucesso', 'Categoria alterada com sucesso');
      onClose();
      navigation.navigate('HomeApp');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível alterar a categoria.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalWrapper}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {CATEGORIES.map((cat) => {
              const disabled = false; // Agora todas estão disponíveis
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelected(cat)}
                  style={[styles.item, selected === cat && styles.selected]}
                >
                  <Text style={[styles.itemText, selected === cat && styles.itemTextSelected]}>{cat}</Text>
                </TouchableOpacity>
              );
            })}

            <Text style={styles.alertText}>
              <Text style={{ fontWeight: 'bold' }}>Atenção:</Text> Ao alterar sua categoria, você não poderá jogar campeonatos de categorias inferiores. Certifique-se de que a mudança é a melhor escolha para o seu nível atual. Essa responsabilidade pela alteração é sua.
            </Text>

            <PrimaryButton
              title={loading ? 'Alterando...' : 'Alterar minha categoria'}
              onPress={handleSubmit}
              disabled={!selected || loading}
            />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    padding: 24,
    backgroundColor: colors.background.elevate,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingBottom: 32,
  },
  scroll: {
    paddingBottom: 32,
    rowGap: 12,
  },
  item: {
    backgroundColor: colors.background.bg,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.neutral[200],
  },
  selected: {
    backgroundColor: colors.brand.primary.main,
    borderWidth: 1.5,
    borderColor: colors.brand.primary.dark,
  },
  itemText: {
    ...typography.title.h5Regular,
    color: colors.text.body,
  },
  itemTextSelected: {
    color: colors.background.bg,
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.4,
  },
  alertText: {
    ...typography.body.p14Regular,
    color: colors.text.caption,
    marginVertical: 12,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});
