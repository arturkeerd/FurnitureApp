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
import { useUser } from "@/hooks/UserContext";

type ListingItem = ItemRowData & {
  _id: string;    // Item _id
  seller: string;
};

export default function MyListingsScreen() {
  const [data, setData] = useState<ListingItem[]>([]);
  const router = useRouter();
  const { user } = useUser();               // <-- already know who's logged in

  const load = useCallback(async () => {
    if (!user?.id) return;                  // not logged in yet / still loading

    const res = await fetch(`${API_URL}/api/items?seller=${user.id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const items = await res.json();

    const mapped: ListingItem[] = items.map((it: any) => ({
      _id: String(it._id),
      seller: String(it.seller),
      title: String(it.name ?? ""),
      price: it.price ?? "",
      image: it.image,
      images: it.images,
    }));

    setData(mapped);
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const removeListing = useCallback(async (itemId: string) => {
    const token = await getToken();
    if (!token) return;

    await fetch(`${API_URL}/api/items/${itemId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },  // keep this protected
    });

    setData((prev) => prev.filter((i) => i._id !== itemId));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Listings" />
      <FlatList
        data={data}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <ItemRow
            item={item}
            onPress={() =>
              router.push({
                pathname: "/home/ProductDetail",
                params: { id: item._id },
              })
            }
            onAction={() => removeListing(item._id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.box}>
            <Text style={styles.noItems}>You have no listings yet</Text>
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