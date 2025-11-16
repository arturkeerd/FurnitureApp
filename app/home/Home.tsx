import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Dimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Header from "@/components/ui/Header";
import CategoryBox from "@/components/ui/CategoryBox";
import ProductHomeItem from "@/components/ui/ProductHomeItem";
import Footer from "@/components/ui/Footer";
import MainView from "@/constants/MainView";
import { categories } from "@/data/Categories";
import { API_URL } from "@/constants/config";

// Use title-based key for categories (e.g., "Chair" -> "chair")
const toCatKey = (s: string) => s.trim().toLowerCase();

interface Category {
  id: number | string;            // we only use it as keyExtractor; filtering uses title
  title: string;
  image: string;
}
interface Product {
  id: string;                     // _id from Mongo
  title: string;                  // name from Mongo
  price: string;
  image?: string | string[];
  images?: string[];
  category: string;               // e.g., "chair", "table", "sofa"
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch Mongo items
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/api/items`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = (await res.json()) as any[];

        // Normalize server -> UI
        const normalized: Product[] = data.map((p) => ({
          id: String(p._id),
          title: String(p.name ?? p.title ?? ""),
          price: String(p.price ?? ""),
          image: Array.isArray(p.images) ? p.images[0] : p.image || "",
          images: Array.isArray(p.images) ? p.images : undefined,
          category: toCatKey(String(p.category ?? "")), // keep as string
        }));

        if (alive) setProducts(normalized);
      } catch (e: any) {
        if (alive) setError(e.message ?? "Failed to load items");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Filter by selectedCategory (string). "All" or null -> show all.
  useEffect(() => {
    if (!selectedCategory || selectedCategory === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const renderCategory = ({ item }: { item: Category }) => {
    const key = toCatKey(item.title); // use title as the canonical category key
    return (
      <CategoryBox
        title={item.title}
        image={item.image}
        isSelected={selectedCategory === key || (!selectedCategory && key === "All")}
        onPress={() =>
          setSelectedCategory((prev) => (prev === key ? null : key))
        }
      />
    );
  };

  const renderProduct = ({ item }: { item: Product }) => {
    const imageUrl =
      typeof item.image === "string"
        ? item.image
        : Array.isArray(item.image)
        ? item.image[0]
        : Array.isArray(item.images)
        ? item.images[0]
        : "";

    return (
      <ProductHomeItem
        title={item.title}
        price={item.price}
        imageUrl={imageUrl}
        onPress={() => router.push({ pathname: "/home/ProductDetail", params: { id: item.id } })}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Furniture Store" />
      {/* Categories */}
      <View >
      <FlatList
        horizontal
        data={categories as Category[]}
        keyExtractor={(c) => String(c.id)}
        renderItem={renderCategory}
        contentContainerStyle={styles.categoryList}
        showsHorizontalScrollIndicator={false}
      />
      </View>

      {loading && <Text style={styles.status}>Loading…</Text>}
      {!!error && <Text style={styles.status}>Error: {error}</Text>}

      {/* Products */}
      
        <FlatList
          data={filtered}
          keyExtractor={(p) => p.id}
          renderItem={renderProduct}
          numColumns={2}
          contentContainerStyle={styles.productGrid}
          showsVerticalScrollIndicator={false}
        />
      
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: "#ffffff" 
  },
  categoryList: { 
    
    paddingVertical: 10, 
    paddingHorizontal: 15 
  },
  productGrid: { 
    gap: 20,
    alignItems: "flex-start",
    justifyContent:"center",
    paddingHorizontal: 10, 
    paddingBottom: 80,
    paddingLeft: 15,
  },
  status: { 
    paddingHorizontal: 16, 
    paddingVertical: 6 
  },
});

export default Home;
