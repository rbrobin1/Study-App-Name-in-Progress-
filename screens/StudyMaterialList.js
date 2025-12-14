import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase"; // ← adjust path if needed

function StudyMaterialList({ navigation }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Listen in real time to the "studyMaterials" collection
    const q = query(
      collection(db, "studyMaterials"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(list);
    });

    // Clean up listener when component unmounts
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>{item.answer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Choose from an existing list of Questions and Answers you've created
      </Text>

      {cards.length === 0 ? (
        <Text style={styles.emptyText}>
          No study materials yet. Create one on the "Create New Study Guide" page.
        </Text>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <View style={styles.buttonRow}>
        <Button
          title="Create New Study Card"
          onPress={() => navigation.navigate("CreateOptions")}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="Study Time!"
          onPress={() => navigation.navigate("GameScreen")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 40,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  answer: {
    fontSize: 15,
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 20,
  },
  buttonRow: {
    marginTop: 8,
  },
});

export default StudyMaterialList;
