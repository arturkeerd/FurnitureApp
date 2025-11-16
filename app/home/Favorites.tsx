import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import ItemRow, { ItemRowData } from "@/components/ui/ItemRow";
import { API_URL } from "@/constants/config";
import { getToken } from "@/utils/token";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Colors from "@/constants/Colors";

type FavItem = ItemRowData & {
  _id: string;          // favorite doc id
  productId: string;    // actual Item _id
};

export default function FavoriteScreen() {
  const [data, setData] = useState<FavItem[]>([]);
  const router = useRouter();

  const load = useCallback(async () => {
    const token = await getToken();
    if (!token) return;

    const meRes = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!meRes.ok) throw new Error(`Auth check failed: ${meRes.status}`);
    const me: { id: string } = await meRes.json();

    const res = await fetch(`${API_URL}/api/favorites?userId=${me.id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const apiResponse = await res.json();

    const mapped: FavItem[] = apiResponse.map((f: any) => ({
      _id: String(f._id),
      productId: String(f.itemId?._id ?? ""),
      title: f.itemId?.name ?? "",
      price: f.itemId?.price ?? "",
      image: f.itemId?.image,
      images: f.itemId?.images,
    }));

    setData(mapped);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = useCallback(async (favoriteId: string) => {
    const token = await getToken();
    if (!token) return;

    await fetch(`${API_URL}/api/favorites/${favoriteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setData((prev) => prev.filter((i) => i._id !== favoriteId));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Favorites" />
      <FlatList
        data={data}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <ItemRow
            item={item}
            onPress={() =>
              router.push({
                pathname: "/home/ProductDetail",
                params: { id: item.productId },
              })
            }
            onAction={() => remove(item._id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.box}>
            <Text style={styles.noItems}>No favorites yet</Text>
          </View>
        }
      />
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  box: { paddingVertical: 40, alignItems: "center" },
  separator: { height: 2, backgroundColor: "#f4f4f4ff" },
  noItems: { fontSize: 16, color: "#777" },
});