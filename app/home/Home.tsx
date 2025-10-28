import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/ui/Header";
import CategoryBox from "@/components/ui/CategoryBox";
import { categories } from "@/data/Categories";
import { products } from "@/data/Products";
import ProductHomeItem from "@/components/ui/ProductHomeItem";

const { width, height } = Dimensions.get('window');

export const wp = (pct: number) => (width * pct) / 100;
export const hp = (pct: number) => (height * pct) / 100;

interface Category {
  id?: string | number;
  title: string;
  image: string;
}

interface Product {
  id: number;
  title: string;
  image: string;
  category: number;
  price: string;
}

const Home = ({ navigation }: any) => {
  // Start with Popular selected (first category)
  const [selectedCategory, setSelectedCategory] = useState<any>(categories[0]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [keyword, setKeyword] = useState<string>("");

  console.log("Home - Selected category:", selectedCategory);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory && selectedCategory.title !== "Popular") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory.id
      );
    }

    if (keyword) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    console.log("Filtered products count:", filtered.length);
    setFilteredProducts(filtered);
  }, [selectedCategory, keyword]);

  const renderCategoryItem = ({ item }: { item: Category }) => {
    const isSelected = selectedCategory?.title === item.title;

    return (
      <CategoryBox
        title={item.title}
        imageUrl={item.image}
        isSelected={isSelected}
        onPress={() => {
          setSelectedCategory(item);
          console.log(`Category ${item.title} selected`);
        }}
      />
    );
  };

  const renderProductItem = ({ item }: { item: Product }) => {
    return (
      <ProductHomeItem
        title={item.title}
        price={item.price}
        imageUrl={item.image}
        onPress={() => {
          
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        showSearch={true}
        title="Find All You Need"
        keyword={keyword}
        setKeyword={setKeyword}
      />

      <FlatList
        data={categories as Category[]}
        renderItem={renderCategoryItem}
        keyExtractor={(item) =>
          item.id != null ? String(item.id) : item.title
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesList}
        keyboardShouldPersistTaps="handled"
        extraData={selectedCategory}
      />

      <FlatList
        key={selectedCategory?.id || selectedCategory?.title || "all"}
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 100 }} />}
        keyboardShouldPersistTaps="handled"
        extraData={filteredProducts}
      />
    </SafeAreaView>
  );
};

export default React.memo(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  categoriesList: {
    maxHeight: 100,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  productsList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    width: wp(10),
  },
});     