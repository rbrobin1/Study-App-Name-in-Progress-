import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase"; // ← adjust path if needed

function CreateOptions({ navigation }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!question.trim() || !answer.trim()) {
      Alert.alert("Missing info", "Please enter both a question and an answer.");
      return;
    }

    try {
      setSaving(true);

      // Add a new document to the "studyMaterials" collection
      await addDoc(collection(db, "studyMaterials"), {
        question: question.trim(),
        answer: answer.trim(),
        createdAt: Timestamp.now(),
      });

      setQuestion("");
      setAnswer("");
      Alert.alert("Saved!", "Your study card has been added.");
      // If you want to jump straight to the list after saving:
      // navigation.navigate("Study List");
    } catch (err) {
      console.error("Error saving card: ", err);
      Alert.alert("Error", "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Build Questions and Answers for Studying here</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your question"
        value={question}
        onChangeText={setQuestion}
        multiline
      />

      <TextInput
        style={[styles.input, styles.answerInput]}
        placeholder="Enter the answer"
        value={answer}
        onChangeText={setAnswer}
        multiline
      />

      <View style={styles.buttonRow}>
        <Button
          title={saving ? "Saving..." : "Save Study Card"}
          onPress={handleSave}
          disabled={saving}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="View Study Materials"
          onPress={() => navigation.navigate("Study List")}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
      </View>

      <View style={styles.buttonRow}>
        <Button title="Study Time!" onPress={() => navigation.navigate("GameScreen")} />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    minHeight: 40,
  },
  answerInput: {
    minHeight: 60,
  },
  buttonRow: {
    marginTop: 8,
  },
});

export default CreateOptions;
