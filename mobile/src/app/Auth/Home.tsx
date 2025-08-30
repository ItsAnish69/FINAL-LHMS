import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home: React.FC = () => {
  const navigation = useNavigation();
  type Book = {
    _id: string;
    title: string;
    author: string;
    isbn?: string;
    available?: number;
    cover?: string;
  };
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    fetch('http://192.168.1.64:5000/api/book')
      .then(res => res.json())
      .then(data => setBooks(data));
    const fetchUser = async () => {
      const userStr = await AsyncStorage.getItem("user");
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
    };
    fetchUser();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      (book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f3f4f6", marginTop: 40 }}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Image source={require("../../assets/images/logo.png")} style={{ width: 40, height: 40, marginRight: 10 }} />
        <Text style={styles.logo}>BookHub</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍 Search by name..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {/* add a button */}
    <TouchableOpacity style={styles.searchButton} onPress={() => setShowLogoutModal(true)}>
      <FontAwesome5 name="sign-out-alt" size={20} color="#fff" />
    </TouchableOpacity>
      </View>

      {/* Book List - 2x2 Grid */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", padding: 8 }}>
        {filteredBooks.map((book, idx) => (
          <View key={book._id || idx} style={[styles.bookCard, { width: "48%", marginBottom: 12 }]}> 
            <View style={styles.bookImageContainer}>
              {book.cover ? (
                <TouchableOpacity onPress={() => (navigation as any).navigate('bookdetail', { id: book._id })}>
                  <Image
                    source={{ uri: book.cover }}
                    style={styles.bookImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>By: {book.author}</Text>
              <Text style={styles.bookAvailability}>
                {(book.available ?? 0) > 0 ? (
                  <Text style={{ color: "green", fontWeight: "bold" }}>
                    {book.available} available
                  </Text>
                ) : (
                  <Text style={{ color: "red", fontWeight: "bold" }}>
                    Not available
                  </Text>
                )}
              </Text>
            </View>
          </View>
        ))}
        {filteredBooks.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 20 }}>No books found</Text>
        )}
      </View>
      {/* Logout Modal */}
      <Modal visible={showLogoutModal} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" }}>
          <View style={{ backgroundColor: "#fff", borderRadius: 16, padding: 24, alignItems: "center", width: 300 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12 }}>Confirm Logout</Text>
            <Text style={{ marginBottom: 16 }}>Do you really want to logout?</Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{ backgroundColor: "#ed3453", paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8, marginHorizontal: 8 }}
                onPress={async () => {
                  await AsyncStorage.clear();
                  setShowLogoutModal(false);
                  (navigation as any).navigate('Login');
                }}
              >
                <Text style={{ color: "#fff" }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "#ccc", paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8, marginHorizontal: 8 }}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={{ color: "#333" }}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    position: "fixed",
    top: 0,
    width: "100%",
    height: 60,
    zIndex: 10,
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#ed3453",
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    height: 40,
  },

  searchButton: {
    backgroundColor: "#ed3453",
    padding: 5,
    borderRadius: 8,
    marginLeft: 8,
  },
  bookCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookImageContainer: {
    alignItems: "center",
    marginBottom: 8,
  },
  bookImage: {
    width: 100,
    height: 140,
    borderRadius: 8,
  },
  bookInfo: {
    alignItems: "center",
  },
  bookTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
    textAlign: "center",
  },
  bookAuthor: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
    textAlign: "center",
  },
  bookAvailability: {
    fontSize: 12,
    marginBottom: 2,
    textAlign: "center",
  },
});

export default Home;
