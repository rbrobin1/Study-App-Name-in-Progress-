import React, { useEffect, useState } from "react";
import {StyleSheet,Text,View,Button,ActivityIndicator,FlatList,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

function Join({ navigation }) {

  const [players, setPlayers] = useState([]); // Store leaderboard data (top players)
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    // Get top scores from the leaderboard so you can "join" other students
    const q = query(
      collection(db, "leaderboard"),   //reads leadboard from firbase
      orderBy("score", "desc"), // sort from highest to lowest and shows only the top 10 
      limit(10)
    );

    const unsubscribe = onSnapshot(
      q,(snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,                                 
          ...doc.data(),                             //updates screen without needing to refresh
        }));
        setPlayers(list);
        setLoading(false);
      },
      (error) => {
        console.error("Error loading leaderboard in Join screen:", error);   //error handling
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item, index }) => (
    // Function that renders each leaderboard row
    <View style={styles.row}>
      <Text style={styles.rank}>{index + 1}.</Text>
      <Text style={styles.name}>{item.name || "Unknown"}</Text>
      <Text style={styles.score}>{item.score ?? 0}%</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study with Other Students</Text>
      <Text style={styles.subtitle}>
        See how other students are doing and join the game to try and beat their scores!
      </Text>

      {loading ? (
        <>
          <ActivityIndicator size="large" />
          <Text style={styles.infoText}>Loading leaderboard...</Text>
        </>
      ) : players.length === 0 ? ( // If no players exist yet
        <Text style={styles.infoText}>
          No one has played yet. Be the first to study and appear on the leaderboard!
        </Text>
      ) : (// If there are players, show leaderboard
        <>
          <Text style={styles.sectionTitle}>Top Scores</Text>
          <FlatList
            data={players}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        </>
      )}

      <View style={styles.buttonRow}>
        <Button
          title="Study Now"
          onPress={() => navigation.navigate("GameScreen")}
        />
      </View>

      <View style={styles.buttonRow}>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rank: {
    width: 28,
    fontSize: 16,
    fontWeight: "600",
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
  score: {
    fontSize: 16,
    fontWeight: "700",
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
  buttonRow: {
    marginTop: 10,
  },
});

export default Join;
