import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/Text';
import { Sizes } from '@/config/size';
import React from 'react';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oh no!' }} />
      <View style={styles.container}>
        <Text type="title">Vitura Health has gotten lost.</Text>
        <Link href="/" style={styles.link}>
          <Text type="link">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.spacing.md,
  },
  link: {
    marginTop: Sizes.spacing.md,
    paddingVertical: Sizes.spacing.md,
  },
});
