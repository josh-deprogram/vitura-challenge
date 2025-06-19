import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import mockPrescriptions from '@/api/mock-data/prescriptions.json';
import { ListItem } from '@/components/feature/ListItem';
import { Text } from '@/components/Text';
import { Colors } from '@/config';
import { Sizes } from '@/config/size';
import { Prescription } from '@/types';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  // TODO: Get prescriptions from API
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState<boolean>(false);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      await fetch('https://api.vitura.com/prescriptions')
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const prescriptionsMock = data as Prescription[];
          setPrescriptions(prescriptionsMock);
        })
        .catch((error) => {
          // API is an example above, so we'll use the mock data for this template
          const prescriptionsMock = mockPrescriptions as Prescription[];
          setPrescriptions(prescriptionsMock);
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

  const renderItem = ({ item }: { item: Prescription }) => {
    return <ListItem item={item} />;
  };

  const renderListHeaderComponent = () => {
    return (
      <View style={styles.listHeaderContainer}>
        <View style={styles.titleContainer}>
          <Text
            style={{ color: Colors.light.primary, textAlign: 'center' }}
            type="title"
          >
            All Prescriptions
          </Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text
            style={{ color: Colors.light.secondary, textAlign: 'center' }}
            type="subtitle"
          >
            Patients meds all in one place
          </Text>
        </View>
      </View>
    );
  };

  const renderListEmptyComponent = () => {
    if (isError) {
      return (
        <View style={styles.listEmptyContainer}>
          <Text>Error retrieving your prescriptions</Text>
        </View>
      );
    }
    return (
      <View style={styles.listEmptyContainer}>
        <Text>No prescriptions available</Text>
      </View>
    );
  };

  const renderListFooterComponent = () => {
    return <View style={styles.listFooterContainer}></View>;
  };

  return (
    <View style={[styles.container, { marginTop: safeAreaInsets.top }]}>
      {isLoading ? (
        <>
          {renderListHeaderComponent()}
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.light.tint} />
          </View>
        </>
      ) : (
        <FlatList
          data={prescriptions}
          renderItem={renderItem}
          keyExtractor={(item: Prescription) => item.id}
          ListEmptyComponent={renderListEmptyComponent}
          ListHeaderComponent={renderListHeaderComponent}
          ListFooterComponent={renderListFooterComponent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Sizes.spacing.md,
    flex: 1,
  },
  titleContainer: {},
  listContainer: {},
  descriptionContainer: {},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -Sizes.spacing.lg * 4,
  },
  listHeaderContainer: {
    padding: Sizes.spacing.md,
  },
  listFooterContainer: {
    paddingBottom: Sizes.spacing.lg * 3,
  },
  listEmptyContainer: {
    padding: Sizes.spacing.md,
  },
});
