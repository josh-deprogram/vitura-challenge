import { Colors } from '@/config';
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
        <Text type="defaultSemiBold">{medication}</Text>
        <View style={styles.statusContainer}>
          <Text type="defaultSemiBold">Status:</Text>
          <Text>{status}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Sizes.spacing.md,
    backgroundColor: Colors.light.light,
    borderRadius: Sizes.spacing.md,
    marginBottom: Sizes.spacing.sm,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusContainer: {},
});
