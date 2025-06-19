export type Prescription = {
  id: string;
  patient: string;
  medication: string;
  prescriber: string;
  datePrescribed: string;
  status: 'active' | 'expired' | 'pending';
  pharmacy: string;
};

export type PrescriptionStatus = 'all' | 'active' | 'pending' | 'expired';
