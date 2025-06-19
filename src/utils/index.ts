import { Colors } from '@/config';
import { Prescription, PrescriptionStatus } from '@/types';

export const formatDate = (date: string | undefined) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const sortPrescriptions = (prescriptions: Prescription[]) => {
  return prescriptions.sort((a, b) => {
    return (
      new Date(b.datePrescribed).getTime() -
      new Date(a.datePrescribed).getTime()
    );
  });
};

export const statusToColor = (status: PrescriptionStatus | '') => {
  switch (status) {
    case 'active':
      return Colors.light.secondary;
    case 'expired':
      return Colors.light.error;
    case 'pending':
      return Colors.light.warning;
  }
};

// Title case the status
export const formattedStatus = (status: string) => {
  return status?.charAt(0).toUpperCase() + status?.slice(1);
};
