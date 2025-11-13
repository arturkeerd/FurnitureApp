import FavoriteItem, { FavItem } from "@/components/ui/FavoriteItem";
import { API_URL } from "@/constants/config";
import { getToken } from "@/utils/token";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function FavoriteScreen() {
  const [data, setData] = useState<FavItem[]>([]);

  const load = useCallback(async () => {
    const token = await getToken();
    if (!token) return;

    // 1) who am I?
    const meRes = await fetch(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!meRes.ok) throw new Error(`Auth check failed: ${meRes.status}`);
    const me: { id: string } = await meRes.json();

    // 2) fetch favorites by userId (your backend expects this)
    const res = await fetch(`${API_URL}/api/favorites?userId=${me.id}`);
    
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const apiResponse = await res.json();

    const mapped: FavItem[] = apiResponse.map((f: any) => ({
      _id: f._id,
      title: f.itemId?.name ?? "",
      price: f.itemId?.price ?? "",
      image: f.itemId?.image,
      images: f.itemId?.images,
    }));

    setData(mapped);
  }, []);

  useEffect(() => { load(); }, [load]);

  const remove = useCallback(async (itemId: string) => {
    const token = await getToken();
    if (!token) return;

    await fetch(`${API_URL}/api/favorites/${itemId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setData(prev => prev.filter(i => i._id !== itemId));
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <Header title="Favorites" />
      <FlatList
        data={data}
        keyExtractor={(i) => i._id}
        renderItem={({ item }) => (
          <FavoriteItem item={item} onRemove={remove} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingVertical: 12 }}
        ListEmptyComponent={
          <View style={style.box}>
            <Text style={{ fontSize: 16, color: "#777" }}>No favorites yet</Text>
          </View>
        }
      />
      <Footer />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: { 
    flex: 1 
  },
  box: {
    padding: 40, 
    alignItems: "center" 
  },
});
