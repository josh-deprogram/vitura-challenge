import { Colors } from '@/config';
import { Sizes } from '@/config/size';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

export const SearchButton = () => {
  const router = useRouter();
  const onSearchPress = () => {
    router.push('/search');
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          { opacity: pressed ? 0.5 : 1 },
        ]}
        onPress={onSearchPress}
      >
        <Feather name="search" size={24} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: Sizes.spacing.xs,
    top: 0,
  },
  buttonContainer: {
    backgroundColor: Colors.light.light,
    padding: Sizes.spacing.sm,
    borderRadius: Sizes.spacing.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
});
