// LeaderBoard.js
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator } from "react-native";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

function LeaderBoard({ navigation }) {
  const [latestEntry, setLatestEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "leaderboard"),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setLatestEntry({ id: doc.id, ...doc.data() });
        } else {
          setLatestEntry(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error loading leaderboard:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>

      {loading ? (
        <>
          <ActivityIndicator size="large" />
          <Text style={styles.text}>Loading most recent game...</Text>
        </>
      ) : latestEntry ? (
        <View style={styles.card}>
          <Text style={styles.label}>Most Recent Game</Text>
          <Text style={styles.name}>Player: {latestEntry.name}</Text>
          <Text style={styles.score}>Score: {latestEntry.score}%</Text>
        </View>
      ) : (
        <Text style={styles.text}>No games have been played yet.</Text>
      )}

      <View style={{ marginTop: 16 }}>
        <Button title="Play Again" onPress={() => navigation.navigate("GameScreen")} />
      </View>

      <View style={{ marginTop: 8 }}>
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
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
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    marginBottom: 4,
  },
  score: {
    fontSize: 18,
    fontWeight: "700",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
});

export default LeaderBoard;
