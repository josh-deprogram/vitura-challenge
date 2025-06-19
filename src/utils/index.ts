import { Prescription } from '@/types';

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
