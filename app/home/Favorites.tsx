import FavoriteItem, { FavItem } from "@/components/ui/FavoriteItem";
import { API_URL } from "@/constants/config";
import { getToken } from "@/utils/token";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

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
      _id: String(f._id),                   // favorite id(not product id) (for DELETE)
      productId: String(f.itemId?._id ?? ""), // actual product id
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
    <SafeAreaView style={style.container}>
      <Header title="Favorites" />
      <FlatList
        data={data}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <FavoriteItem
            item={item}
            onPress={() =>
              router.push({
                pathname: "/home/ProductDetail",
                params: { id: item.productId },   
              })
            }
            onRemove={remove}
          />
        )}
        ItemSeparatorComponent={() => <View style={style.separator} />}
        ListEmptyComponent={
          <View style={style.box}>
            <Text style={style.noItems}>No favorites yet</Text>
          </View>
        }
      />
      <Footer />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  box: {
    paddingVertical: 40,
    alignItems: "center",
  },
  separator: {
    height: 2,
    backgroundColor: "#f4f4f4ff",
  },
  noItems: {
    fontSize: 16,
    color: "#777",
  },
});