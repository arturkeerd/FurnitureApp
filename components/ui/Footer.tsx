import { Pressable, Image, Text, View, TextInput, StyleSheet } from "react-native";
import { usePathname , useRouter } from "expo-router";

export default function Footer() {

    const router = useRouter();
    const pathname = usePathname(); // automatically gets the current path
    const activePage = pathname.split('/').pop(); // last part of the path

    const handleHome = () => {
        router.push ("/home/Home");
    };
    const handleFavorites = () => {
        router.push ("/home/Favorites");
    };
    const handleUser = () => {
        router.push ("/home/Profile");
    };
  return ( //hitSlop makes the touchable area larger
        <View style={styles.container}>
            <Pressable hitSlop={20} onPress={handleHome}> 
            <Image 
                style={styles.home}
                source={
                    activePage === "Home"
                    ? require("@/assets/images/home-active.png")
                    : require("@/assets/images/home.png")}
            />
            </Pressable>
            <Pressable hitSlop={20} onPress={handleFavorites}>
            <Image
                style={styles.favorites}
                source={
                    activePage === "Favorites"
                    ? require("@/assets/images/favorites-active.png")
                    : require("@/assets/images/favorites.png")}
            />
            </Pressable>
            <Pressable hitSlop={20} onPress={handleUser}>
            <Image
                style={styles.user}
                source={
                    activePage === "Profile"
                    ? require("@/assets/images/user-active.png")
                    : require("@/assets/images/user.png")}
            />
            </Pressable>
        </View>
    )};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 100,
        width: "100%",
        backgroundColor: '#FFFFFF',
    },
    home: {
        width: 30,
        height: 30,
        left: 20,
    },
    favorites: {
        width: 30,
        height: 34,
    },
    user: {
        width: 30,
        height: 30,
        right: 20,
    },
});