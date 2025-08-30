import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Modal,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

const BookDetail: React.FC = () => {
     const navigation = useNavigation();
	const route = useRoute();
	const { id } = route.params as { id: string };
	const [book, setBook] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [showBorrowModal, setShowBorrowModal] = useState(false);

	useEffect(() => {
		fetch(`http://192.168.1.64:5000/api/book/${id}`)
			.then(res => res.json())
			.then(data => {
				setBook(data);
				setLoading(false);
			});
	}, [id]);

	const handleBorrow = async () => {
		setShowBorrowModal(false);
		alert("Book borrowed successfully!");
	};

	if (loading) {
		return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Loading...</Text></View>;
	}

	if (!book) {
		return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text>Book not found</Text></View>;
	}

	return (
		<View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
			{/* Fixed Navbar */}
			<View style={styles.navbar}>
				<Image source={require("../../assets/images/logo.png")} style={{ width: 40, height: 40, marginRight: 10 }} />
				<Text style={styles.logo}>BookHub</Text>
			</View>
			<ScrollView contentContainerStyle={{ paddingTop: 60 }}>
				<View style={styles.container}>
					<Image
						source={{ uri: book.cover || "https://picsum.photos/200/300" }}
						style={styles.cover}
						resizeMode="cover"
					/>
					<Text style={styles.title}>{book.title}</Text>
					<Text style={styles.author}>By: {book.author}</Text>
					<Text style={styles.author}>{book.paragraph}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 12 }}>
                        <TouchableOpacity style={styles.box1}>
                            <Text style={styles.button1}>Quantity: {book.quantity}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.box1}>
                            <Text style={styles.button1}>Available: {book.available}</Text>
                        </TouchableOpacity>
                    </View>
					<TouchableOpacity style={styles.borrowButton} onPress={() => setShowBorrowModal(true)}>
						<Text style={{ color: "#fff", fontWeight: "bold" }}>Borrow Now</Text>
					</TouchableOpacity>
				</View>
				{/* Borrow Modal */}
				<Modal visible={showBorrowModal} transparent animationType="slide">
					<View style={styles.modalOverlay}>
						<View style={styles.modalContent}>
							<Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12 }}>Confirm Borrow</Text>
							<Text style={{ marginBottom: 16 }}>Are you sure you want to borrow this book?</Text>
							<View style={{ flexDirection: "row", justifyContent: "center" }}>
								<TouchableOpacity style={styles.modalButton} onPress={() => {
                                    setShowBorrowModal(false);
                                    (navigation as any).navigate('Home');
                                }}>
									<Text style={{ color: "#fff" }}>Yes</Text>
								</TouchableOpacity>
								<TouchableOpacity style={[styles.modalButton, { backgroundColor: "#ccc" }]} onPress={() => setShowBorrowModal(false)}>
									<Text style={{ color: "#333" }}>No</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	navbar: {
		position: "absolute",
		top: 50,
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
    box1: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 12,
	},
	button1: {
        paddingHorizontal: 20,
		backgroundColor: "#e5e7eb",
        borderWidth: 1,
		paddingVertical: 10,
		borderRadius: 8,
		marginHorizontal: 8,
	},
	container: {
		alignItems: "center",
		padding: 24,
		marginTop: 80,
	},
	cover: {
		width: 180,
		height: 260,
		borderRadius: 16,
		marginBottom: 18,
		backgroundColor: "#eee",
	},
	title: {
		fontWeight: "bold",
		fontSize: 24,
		marginBottom: 8,
		textAlign: "center",
	},
	author: {
		fontSize: 16,
		color: "#555",
		marginBottom: 18,
		textAlign: "center",
	},
	borrowButton: {
		backgroundColor: "#ed3453",
		paddingHorizontal: 32,
		paddingVertical: 12,
		borderRadius: 8,
		marginTop: 80,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 24,
		alignItems: "center",
		width: 300,
	},
	modalButton: {
		backgroundColor: "#ed3453",
		paddingHorizontal: 24,
		paddingVertical: 10,
		borderRadius: 8,
		marginHorizontal: 8,
	},
});

export default BookDetail;
