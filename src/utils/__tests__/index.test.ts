/// <reference types="jest" />

import mockPrescriptionsData from '@/api/mock-data/prescriptions.json';
import { Prescription } from '@/types';
import { formatDate, sortPrescriptions } from '../index';

const mockPrescriptions = mockPrescriptionsData as Prescription[];

describe('formatDate', () => {
  it('should format a date string correctly', () => {
    const date = '2025-02-10';
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('February 10, 2025');
  });

  it('should handle undefined date', () => {
    const formattedDate = formatDate(undefined);
    expect(formattedDate).toBe('');
  });

  it('should handle invalid date string', () => {
    const date = 'invalid-date';
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('Invalid Date');
  });
});

describe('sortPrescriptions', () => {
  it('should sort prescriptions by date in descending order', () => {
    const sortedPrescriptions = sortPrescriptions([...mockPrescriptions]);

    expect(sortedPrescriptions[0].id).toBe(
      '63fd4349-3ffa-40c8-981c-e0a53dc36fbc'
    ); // Most recent
    expect(sortedPrescriptions[1].id).toBe(
      'ea658e78-0e13-42c2-a484-fb86c9bd377e'
    );
    expect(sortedPrescriptions[2].id).toBe(
      '41114a8b-9563-44dc-91f8-c2c9a60d82cc'
    ); // Oldest
  });

  it('should handle empty array', () => {
    const sortedPrescriptions = sortPrescriptions([]);
    expect(sortedPrescriptions).toHaveLength(0);
  });

  it('should handle single prescription', () => {
    const singlePrescription = [mockPrescriptions[0]];
    const sortedPrescriptions = sortPrescriptions(singlePrescription);
    expect(sortedPrescriptions).toHaveLength(1);
    expect(sortedPrescriptions[0]).toEqual(mockPrescriptions[0]);
  });

  it('should maintain original prescription data after sorting', () => {
    const sortedPrescriptions = sortPrescriptions([...mockPrescriptions]);

    // Check that all prescriptions still have their complete data
    sortedPrescriptions.forEach((prescription) => {
      expect(prescription).toHaveProperty('id');
      expect(prescription).toHaveProperty('patient');
      expect(prescription).toHaveProperty('medication');
      expect(prescription).toHaveProperty('prescriber');
      expect(prescription).toHaveProperty('datePrescribed');
      expect(prescription).toHaveProperty('status');
      expect(prescription).toHaveProperty('pharmacy');
    });
  });
});
