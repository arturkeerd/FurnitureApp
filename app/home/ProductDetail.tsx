import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import MainView from "@/constants/MainView";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ProductDetailProps = {
    image?: string | number;
    title?: string;
    price?: string;
    description?: string;
    onBack?: () => void; // optional callback
};

export default function ProductDetail({
  image,
  title,
  price,
  description,
  onBack,
}: ProductDetailProps) {
  const insets = useSafeAreaInsets();
  const FOOTER_H = 72;
  return (
    <MainView contentStyle={{ padding: 0 }}>
      <View>
        <Image
          source={typeof image === "string" ? { uri: image } : image}
          style={styles.image}
        />
        {onBack && (
          <Pressable onPress={onBack} style={styles.backButton}>
            <Image
              source={require("../../assets/images/back.png")}
              style={styles.backIcon}
            />
          </Pressable>
        )}
      </View>

      <View style={styles.card}>
        {!!title && <Text style={styles.title}>{title}</Text>}
        {!!price && <Text style={styles.price}>{price}</Text>}
        {!!description && <Text style={styles.description}>{description}</Text>}
      </View>
      <View style={[styles.bottomButtons, { height: FOOTER_H + insets.bottom, paddingBottom: insets.bottom }]}>
        <Pressable style={styles.favouritesButton} accessibilityLabel="Add to favourites">
          <Image source={require("@/assets/images/favourites-active.png")} style={styles.favouritesIcon} />
        </Pressable>

        <Pressable style={styles.contactSeller}>
          <Text style={styles.buttonText}>Contact Seller</Text>
        </Pressable>
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
    backButton: { 
        top: 10,
        position: 'absolute', 
        padding: 10, 
        zIndex: 10 
    },
    backIcon: { 
        width: 100, 
        height: 100, 
        tintColor: '#000' 
    },
    image: {
        width: '100%',
        height: 450,
        resizeMode: 'cover',
    },
    card: {
        bottom: 20,
        paddingHorizontal: 25,
        paddingTop: 20,
        borderRadius: 20,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        marginTop: 10,
    },
    price: {
        fontSize: 26,
        color: 'black',
        marginVertical: 10,
        fontWeight: '600',
    },
    description: {
        height: 140,
        fontSize: 16,
        color: Colors.grey,
    },
    bottomButtons: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 30,
        paddingHorizontal: 25,
        marginVertical: 10,
        backgroundColor: Colors.background,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        width: '100%',
    },
    favouritesButton: {
        marginTop: 20,
        backgroundColor: Colors.extraLightGrey,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        width: 70,
        height: 70,
    },
    favouritesIcon: {
        width: 30,
        height: 30,
    },
    contactSeller: {
        marginTop: 20,
        backgroundColor: Colors.blue,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: 70,
    },
    buttonText: { 
        color: Colors.white, 
        fontSize: 24, 
    },
});