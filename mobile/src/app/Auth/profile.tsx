import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return;
      fetch(`http://192.168.1.64:5000/api/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };
    fetchUser();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      {/* Fixed Navbar */}
      <View style={styles.navbar}>
        <Image source={require("../../assets/images/logo.png")} style={{ width: 40, height: 40, marginRight: 10 }} />
        <Text style={styles.logo}>BookHub</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingTop: 60, alignItems: "center" }}>
        <View style={styles.profileContainer}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.avatar}
          />
          <TextInput
            style={styles.input}
            value={user?.name || ""}
            editable={false}
            placeholder="User Name"
          />
          <TextInput
            style={styles.input}
            value={user?.email || ""}
            editable={false}
            placeholder="User Email"
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    zIndex: 10,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#ed3453",
    marginRight: 10,
  },
  profileContainer: {
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: 320,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 18,
    backgroundColor: "#eee",
  },
  input: {
    width: "100%",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
  },
});

export default Profile;
