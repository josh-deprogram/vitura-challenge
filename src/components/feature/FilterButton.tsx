import { Colors } from '@/config';
import { Sizes } from '@/config/size';
import { PrescriptionStatus } from '@/types';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from '../Text';

export const FilterButton = ({
  status,
  label,
  onPress,
  selectedStatus,
}: {
  status: PrescriptionStatus;
  selectedStatus: PrescriptionStatus;
  label: string;
  onPress: (status: PrescriptionStatus) => void;
}) => (
  <Pressable
    style={[
      styles.filterButton,
      selectedStatus === status && styles.filterButtonActive,
    ]}
    onPress={() => onPress(status)}
  >
    <Text
      style={[
        styles.filterButtonText,
        selectedStatus === status && styles.filterButtonTextActive,
      ]}
    >
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Sizes.spacing.md,
    paddingHorizontal: Sizes.spacing.sm,
  },
  filterButton: {
    paddingHorizontal: Sizes.spacing.md,
    paddingVertical: Sizes.spacing.sm,
    borderRadius: Sizes.radius.sm,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  filterButtonText: {
    color: Colors.light.text,
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: Colors.light.background,
  },
});
