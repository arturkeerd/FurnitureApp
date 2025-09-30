import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { MainView } from '@/constants/main-view';
import { ThemedText } from '@/constants/main-text';

export default function ModalScreen() {
  return (
    <MainView style={styles.container}>
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
