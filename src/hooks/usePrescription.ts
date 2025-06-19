import mockPrescriptions from '@/api/mock-data/prescriptions.json';
import { Prescription } from '@/types';

export const usePrescription = (prescription_id: string) => {
  const currentPrescription = mockPrescriptions.find(
    (prescription) => prescription.id === prescription_id
  ) as Prescription | undefined;

  return { currentPrescription };
};
