import { Colors } from '@/config';
import { Sizes } from '@/config/size';
import { Prescription } from '@/types';
import { formatDate } from '@/utils';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../Text';

export const ListItem = ({ item }: { item: Prescription }) => {
  const { id, medication, patient, status, datePrescribed, pharmacy } = item;

  const handlePress = () => {
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
        <View style={styles.patientContainer}>
          <Text style={styles.textSmall} type="defaultSemiBold">
            Patient:
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {patient}
          </Text>
        </View>
        <View style={styles.medicationContainer}>
          <Text style={styles.textSmall} type="defaultSemiBold">
            Medication:
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textSmall}>
            {medication}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.textSmall} type="defaultSemiBold">
            Status:
          </Text>
          <Text style={styles.textSmall}>{status}</Text>
        </View>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.textXSmall} type="defaultSemiBold">
          Date Prescribed:
        </Text>
        <Text style={styles.textXSmall}> {formatDate(datePrescribed)}</Text>
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
  patientContainer: {
    width: '33%',
  },
  medicationContainer: {
    width: 100,
  },
  dateContainer: {
    marginTop: Sizes.spacing.sm,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  statusContainer: {},
  textSmall: {
    fontSize: Sizes.fontSize.sm,
  },
  textXSmall: {
    fontSize: Sizes.fontSize.xs,
  },
});
