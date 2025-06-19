import { Text } from '@/components/Text';
import { Colors } from '@/config';
import { Sizes } from '@/config/size';
import { usePrescription } from '@/hooks/usePrescription';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

type ScreenParams = {
  prescription_id: string;
};

const PrescriptionScreen = () => {
  const params: ScreenParams =
    useLocalSearchParams() as unknown as ScreenParams;
  const { prescription_id } = params;
  const { currentPrescription } = usePrescription(prescription_id);

  return (
    <View style={[styles.container]}>
      {/* <Text>{currentPrescription?.id}</Text> */}
      <View style={styles.prescriptionRow}>
        <Text type="defaultSemiBold">Medication:</Text>
        <Text>{currentPrescription?.medication}</Text>
      </View>
      <View style={styles.prescriptionRow}>
        <Text type="defaultSemiBold">Pharmacy:</Text>
        <Text>{currentPrescription?.pharmacy}</Text>
      </View>
      <View style={styles.prescriptionRow}>
        <Text type="defaultSemiBold">Patient:</Text>
        <Text>{currentPrescription?.patient}</Text>
      </View>
      <View style={styles.prescriptionRow}>
        <Text type="defaultSemiBold">Prescriber:</Text>
        <Text>{currentPrescription?.prescriber}</Text>
      </View>
      <View style={styles.prescriptionRow}>
        <Text type="defaultSemiBold">Date Prescribed:</Text>
        <Text>{currentPrescription?.datePrescribed}</Text>
      </View>
      <View style={styles.prescriptionRow}>
        <Text type="defaultSemiBold">Status:</Text>
        <Text>{currentPrescription?.status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizes.spacing.md,
  },
  prescriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Sizes.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.text,
    paddingBottom: Sizes.spacing.sm,
  },
});

export default PrescriptionScreen;
