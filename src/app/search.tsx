import { Stack } from 'expo-router';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';

import { ListItem } from '@/components/feature/ListItem';
import { Text } from '@/components/Text';
import { Colors } from '@/config';
import { Sizes } from '@/config/size';
import { usePrescriptions } from '@/context/PrescriptionsContext';
import { Prescription } from '@/types';
import React, { useEffect, useState } from 'react';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Prescription[]>([]);
  const { prescriptions } = usePrescriptions() || {};

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleSearch = () => {
    // Filter through the prescriptions and return the ones that match the search query

    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const results = prescriptions?.filter((prescription) =>
      prescription.patient.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results || []);
  };

  const renderItem = ({ item }: { item: Prescription }) => {
    return <ListItem item={item} />;
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Search' }} />
      <View style={styles.container}>
        <Text type="subtitle">Search for a patients medicine:</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search for a patient"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
            onSubmitEditing={handleSearch}
          />
        </View>
        <FlatList
          style={styles.listContainer}
          data={searchResults}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: Sizes.spacing.md,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  searchContainer: {
    paddingVertical: Sizes.spacing.md,
    width: '100%',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: Colors.light.secondary,
    borderRadius: Sizes.spacing.sm,
    padding: Sizes.spacing.sm,
    height: 50,
  },
});
