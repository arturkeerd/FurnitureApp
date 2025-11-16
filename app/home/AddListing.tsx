import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity , Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import MainView from "@/constants/MainView";
import Colors from "@/constants/Colors";
import Input from "@/components/ui/Input";
import { categories } from "@/data/Categories";
import { API_URL } from "@/constants/config";
import { getToken } from "@/utils/token";
import { useUser } from "@/hooks/UserContext";
import * as ImagePicker from "expo-image-picker";


const toCatKey = (s: string) => s.trim().toLowerCase();
const selectableCategories = categories.filter((c) => c.title !== "Popular");

function ImageThumb({
  uri,
  onRemove,
}: {
  uri: string;
  onRemove?: () => void;
}) {
  return (
    <View style={styles.imageThumb}>
      <Image source={{ uri }} style={styles.imageThumbImage} />
      {onRemove && (
        <TouchableOpacity style={styles.imageThumbClose} onPress={onRemove}>
          <Image
            source={require("@/assets/images/close.png")}
            style={styles.close}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function AddListing() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(""); // slug: "chair", "table"...
  const [categoryLabel, setCategoryLabel] = useState(""); // pretty text
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const { user } = useUser();

  const handleAddImage = async () => {
    // 1) ask for permission
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission needed", "Please allow photo library access.");
      return;
    }

    // 2) open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,   // you can change later
      quality: 0.8,
    });

    if (result.canceled) return;

    // 3) get URI of picked image
    const uri = result.assets[0]?.uri;
    if (!uri) return;

    // 4) append to images state
    setImages((prev) => [...prev, uri]);
  };

const handleSubmit = async () => {
  if (!user?.id) {
    Alert.alert("Error", "You must be logged in to create a listing.");
    return;
  }

  if (!title.trim() || !category || !price.trim()) {
    Alert.alert("Error", "Title, category and price are required.");
    return;
  }

  try {
    const token = await getToken();
    if (!token) {
      Alert.alert("Error", "Missing auth token, please sign in again.");
      return;
    }

    const body = {
      name: title.trim(),
      price: Number(price),
      description: description.trim(),
      image: images[0] || "",       // first image as main
      category,                     // e.g. "table", "chair"
    };

    const res = await fetch(`${API_URL}/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.log("Create listing failed", err);
      Alert.alert("Error", "Failed to create listing.");
      return;
    }

    // optional: clear form or go to My Listings
    // const created = await res.json();
    // console.log("created", created);

    router.push("/home/MyListings");
  } catch (e) {
    console.error("Create listing error", e);
    Alert.alert("Error", "Something went wrong while creating the listing.");
  }
};

  const handleRemoveImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSelectCategory = (label: string) => {
    setCategoryLabel(label);
    setCategory(toCatKey(label));
    setCategoryOpen(false);
  };

  return (
    <MainView header={<Header title="Create a new listing" />} scroll={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollBody}
          showsVerticalScrollIndicator={false}
        >
          {/* Photos */}
          <Text style={styles.sectionTitle}>Upload photos</Text>
            <View style={styles.photosRow}>
                <TouchableOpacity
                    style={styles.addPhotoTile}
                    activeOpacity={0.8}
                    onPress={handleAddImage}
                >
                    <Text style={styles.addPlus}>＋</Text>
                </TouchableOpacity>

                {images.map((uri, index) => (
                    <ImageThumb
                    key={uri + index}
                    uri={uri}
                    onRemove={() => handleRemoveImage(index)}
                    />
                ))}
                </View>

          {/* Title */}
          <Input
            label="Title"
            placeholder="Listing Title"
            value={title}
            onChangeText={setTitle}
          />

          {/* Category dropdown */}
          <View style={styles.dropdownWrapper}>
            <Text style={styles.dropdownLabel}>Category</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.dropdownField}
              onPress={() => setCategoryOpen((v) => !v)}
            >
              <Text
                style={
                  categoryLabel ? styles.dropdownValue : styles.dropdownPlaceholder
                }
              >
                {categoryLabel || "Select the category"}
              </Text>
              <Text style={styles.dropdownChevron}>⌵</Text>
            </TouchableOpacity>

            {categoryOpen && (
              <View style={styles.dropdownMenu}>
                {selectableCategories.map((c) => (
                  <TouchableOpacity
                    key={String(c.id ?? c.title)}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectCategory(c.title)}
                  >
                    <Text style={styles.dropdownItemText}>{c.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Price */}
          <Input
            label="Price"
            placeholder="Enter price in EUR"
            value={price}
            onChangeText={setPrice}
          />

          {/* Description */}
          <Input
            label="Description"
            placeholder="Tell us more..."
            value={description}
            onChangeText={setDescription}
            multiline
            containerStyle={{ height: 120 }}           // taller rounded box
            style={{ paddingTop: 12 }}                 // optional: move text a bit down
          />

          {/* Submit */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.9}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
        <Footer />
      </SafeAreaView>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollBody: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.black,
  },
  photosRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  addPhotoTile: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#C0C0C0",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
  },
  addPlus: {
    fontSize: 32,
    color: Colors.blue,
  },
  imageThumb: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
  },
    imageThumbClose: {          // overlay for the x
    position: "absolute",
    top: 2,
    right: 2,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  close: {
    width: 24,
    height: 24,
  },
  imageThumbImage: { width: "100%", height: "100%" },
  dropdownWrapper: { marginBottom: 24 },
  dropdownLabel: {
    color: Colors.blue,
    marginBottom: 8,
    fontWeight: "500",
  },
  dropdownField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: Colors.background,
  },
  dropdownPlaceholder: {
    color: Colors.lightGrey,
  },
  dropdownValue: {
    color: Colors.black,
  },
  dropdownChevron: {
    fontSize: 18,
    color: Colors.lightGrey,
  },
  dropdownMenu: {
    marginTop: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    color: Colors.lightGrey,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: Colors.blue,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
