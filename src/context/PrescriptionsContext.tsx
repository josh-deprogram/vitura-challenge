import { Prescription, PrescriptionStatus } from '@/types';
import { sortPrescriptions } from '@/utils';
import React, { createContext, useContext, useEffect, useState } from 'react';

import mockPrescriptions from '@/api/mock-data/prescriptions.json';

export type PrescriptionsContextType = {
  prescriptions: Prescription[];
  isLoading: boolean;
  isError: boolean;
  selectedStatus: PrescriptionStatus;
  setSelectedStatus: (status: PrescriptionStatus) => void;
  filteredPrescriptions: Prescription[];
  refreshPrescriptions: () => Promise<void>;
};

const PrescriptionsContext = createContext<
  PrescriptionsContextType | undefined
>(undefined);

export function PrescriptionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedStatus, setSelectedStatus] =
    useState<PrescriptionStatus>('all');

  const fetchPrescriptions = async () => {
    try {
      await fetch('https://api.vitura.com/prescriptions')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const prescriptionsData = data as Prescription[];
          setPrescriptions(sortPrescriptions(prescriptionsData));
        })
        .catch((error) => {
          // API is an example above, so we'll use the mock data for this template app,
          // - IRL I perhaps would not be mocking here!
          const prescriptionsMock = mockPrescriptions as Prescription[];
          setPrescriptions(sortPrescriptions(prescriptionsMock));
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error('Fetch failed:', error);
      setError(true);
      setPrescriptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    if (selectedStatus === 'all') return true;
    return prescription.status === selectedStatus;
  });

  const value: PrescriptionsContextType = {
    prescriptions,
    isLoading,
    isError,
    selectedStatus,
    setSelectedStatus,
    filteredPrescriptions,
    refreshPrescriptions: fetchPrescriptions,
  };

  return (
    <PrescriptionsContext.Provider value={value}>
      {children}
    </PrescriptionsContext.Provider>
  );
}

export function usePrescriptions() {
  const context = useContext(PrescriptionsContext);
  return context;
}
