import { Sizes } from '@/config/size';
import { Prescription } from '@/types';
import { StyleSheet, View } from 'react-native';
import { Text } from './Text';

export const ListItem = ({ item }: { item: Prescription }) => {
  const { medication, status, datePrescribed, pharmacy } = item;

  return (
    <View style={styles.container}>
      <Text>{medication}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Sizes.spacing.md,
  },
});
