import { Sizes } from '@/config/size';
import { Prescription } from '@/types';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../Text';

export const ListItem = ({ item }: { item: Prescription }) => {
  const { id, medication, status, datePrescribed, pharmacy } = item;

  const handlePress = () => {
    console.log('Pressed');
    router.push(`/prescription/${id}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { opacity: pressed ? 0.5 : 1 },
      ]}
    >
      <View style={styles.innerContainer}>
        <Text>{medication}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Sizes.spacing.md,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
