import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

import { FilterButton } from '@/components/feature/FilterButton';
import { ListItem } from '@/components/feature/ListItem';
import { SearchButton } from '@/components/feature/SearchButton';
import { Text } from '@/components/Text';
import { Colors } from '@/config';
import { Sizes } from '@/config/size';
import { usePrescriptions } from '@/context/PrescriptionsContext';
import { Prescription } from '@/types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const {
    isLoading,
    isError,
    selectedStatus,
    setSelectedStatus,
    filteredPrescriptions,
    refreshPrescriptions,
    prescriptions,
  } = usePrescriptions() || {};

  console.log('DATA: prescriptions', prescriptions);

  const renderItem = ({ item }: { item: Prescription }) => {
    return <ListItem item={item} />;
  };

  const renderListHeaderComponent = () => {
    return (
      <View style={styles.listHeaderContainer}>
        <SearchButton />

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
        <View style={styles.filterContainer}>
          <FilterButton
            status="all"
            label="All"
            onPress={(status) => setSelectedStatus?.(status)}
            selectedStatus={selectedStatus ?? 'all'}
          />
          <FilterButton
            status="active"
            label="Active"
            onPress={(status) => setSelectedStatus?.(status)}
            selectedStatus={selectedStatus ?? 'active'}
          />
          <FilterButton
            status="pending"
            label="Pending"
            onPress={(status) => setSelectedStatus?.(status)}
            selectedStatus={selectedStatus ?? 'pending'}
          />
          <FilterButton
            status="expired"
            label="Expired"
            onPress={(status) => setSelectedStatus?.(status)}
            selectedStatus={selectedStatus ?? 'expired'}
          />
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
          data={filteredPrescriptions}
          renderItem={renderItem}
          onRefresh={refreshPrescriptions}
          refreshing={isLoading}
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
  titleContainer: {
    paddingTop: Sizes.spacing.sm,
  },
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Sizes.spacing.md,
    paddingHorizontal: Sizes.spacing.sm,
  },
});
