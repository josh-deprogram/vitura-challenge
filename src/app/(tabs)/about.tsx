import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Text } from '@/components/Text';
import { Colors } from '@/config';
import { Sizes } from '@/config/size';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <View>
          <Image
            source={require('@/assets/images/Vitura-White.png')}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              paddingTop: 90,
              bottom: -80,
              width: '100%',
            }}
          />
        </View>
      }
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text type="title">About</Text>
        </View>
        <Text>
          This app contains a list of prescriptions and their details.
        </Text>
        <Text>
          The app is built with React Native and Expo, and uses mock data from
          the Vitura API to fetch the prescriptions.
        </Text>
        <Text>A sample of how I may strucutre components and architecture</Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: Colors.light.light,
    padding: Sizes.spacing.md,
    borderRadius: Sizes.radius.md,
  },
  headerImage: {
    color: '#808080',
    bottom: -40,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: Sizes.spacing.sm,
    width: '100%',
  },
});
