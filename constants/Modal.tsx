import ThemedText from '@/constants/MainText';
import MainView from '@/constants/MainView';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

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
