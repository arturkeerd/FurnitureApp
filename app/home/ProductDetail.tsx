// app/home/ProductDetail.tsx
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import MainView from "@/constants/MainView";
import { Image } from "expo-image";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { API_URL } from "@/constants/config";

type Item = {
  _id: string;
  name?: string;
  title?: string;         // your normalization used name/title
  price?: number | string;
  description?: string;
  image?: string;
  images?: string[];
};

function first(v?: string | string[]) {
  return Array.isArray(v) ? v[0] : v;
}

export default function ProductDetail() {
  const { id: rawId } = useLocalSearchParams();
  const id = first(rawId);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch by id
  useEffect(() => {
    let alive = true;
    if (!id) return;

    const controller = new AbortController();

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_URL}/api/items/${id}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Item;
        if (alive) setItem(data);
      } catch (e: any) {
        if (alive) setError(e?.message ?? "Failed to load item");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
      controller.abort();
    };
  }, [id]);

  // Pick normalized fields for display
  const title = useMemo(() => item?.name ?? item?.title ?? "", [item]);
  const price = useMemo(() => (item?.price != null ? String(item.price) : ""), [item]);
  const image = useMemo(
    () => item?.image ?? (Array.isArray(item?.images) ? item!.images![0] : undefined),
    [item]
  );
  const description = item?.description ?? "";

  const FOOTER_H = 72;

  return (
    <MainView contentStyle={{ padding: 0 }}>
      <Stack.Screen options={{ title: title || "Product" }} />

      {/* Hero image + back button */}
      <View>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} contentFit="cover" />
        ) : (
          <View style={[styles.image, { alignItems: "center", justifyContent: "center" }]}>
            <Text style={{ color: Colors.grey }}>No image</Text>
          </View>
        )}

        <Pressable onPress={() => router.back()} style={styles.backButton} accessibilityLabel="Go back">
          <Image source={require("@/assets/images/back.png")} style={styles.backIcon} contentFit="contain" />
        </Pressable>
      </View>

      {/* Loading / Error / Content card */}
      {loading ? (
        <View style={[styles.card, { alignItems: "center" }]}>
          <ActivityIndicator />
        </View>
      ) : error ? (
        <View style={[styles.card, { alignItems: "center" }]}>
          <Text style={{ color: "crimson" }}>Error: {error}</Text>
        </View>
      ) : (
        <View style={styles.card}>
          {!!title && <Text style={styles.title}>{title}</Text>}
          {!!price && <Text style={styles.price}>{price}</Text>}
          {!!description && <Text style={styles.description}>{description}</Text>}
        </View>
      )}

      {/* Bottom actions */}
      <View
        style={[
          styles.bottomButtons,
          { height: FOOTER_H + insets.bottom, paddingBottom: insets.bottom },
        ]}
      >
        <Pressable style={styles.favoritesButton} accessibilityLabel="Add to favorites">
          <Image source={require("@/assets/images/favorites-active.png")} style={styles.favoritesIcon} contentFit="contain" />
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
    position: "absolute",
    padding: 10,
    zIndex: 10,
  },
  backIcon: {
    width: 100,
    height: 100,
    tintColor: "#000",
  },
  image: {
    width: "100%",
    height: 450,
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
    fontWeight: "500",
    marginTop: 10,
  },
  price: {
    fontSize: 26,
    color: "black",
    marginVertical: 10,
    fontWeight: "600",
  },
  description: {
    minHeight: 40,
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
    width: "100%",
  },
  favoritesButton: {
    marginTop: 20,
    backgroundColor: Colors.extraLightGrey,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    width: 70,
    height: 70,
  },
  favoritesIcon: {
    width: 30,
    height: 30,
  },
  contactSeller: {
    marginTop: 20,
    backgroundColor: Colors.blue,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 70,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 24,
  },
});