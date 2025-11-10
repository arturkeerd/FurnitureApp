import FavoriteItem, { FavItem } from "@/components/ui/FavoriteItem";
import { API_URL } from "@/constants/config";
import { getToken } from "@/utils/token";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View, Text , StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

export default function FavoriteScreen() {
  const [data, setData] = useState<FavItem[]>([]);

  const load = useCallback(async () => {
    const token = await getToken();
    if (!token) return;

    const res = await fetch(`${API_URL}/api/favorites`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      // 404 here means wrong URL/port or route not mounted
      throw new Error(`HTTP ${res.status}`);
    }

    const items: FavItem[] = await res.json();
    setData(items);
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
          <View style={{ padding: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#777" }}>No favorites yet</Text>
          </View>
        }
      />
      <Footer/>
    </SafeAreaView>
  );
}

const style = StyleSheet.create ({
  container: {
    flex: 1,
  }
});