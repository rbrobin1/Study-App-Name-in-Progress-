// GameScreen.js
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../services/firebase";

function GameScreen({ navigation }) {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [savingScore, setSavingScore] = useState(false);

  const totalQuestions = questions.length;
  const scorePercent =
    totalQuestions === 0
      ? 0
      : Math.round((correctCount / totalQuestions) * 100);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const snapshot = await getDocs(collection(db, "studyMaterials"));
        let list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter out any entries without both question and answer
        list = list.filter(
          (q) => q.question && q.answer && q.question.trim() && q.answer.trim()
        );

        // Shuffle the list (Fisher-Yates)
        for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list[i], list[j]] = [list[j], list[i]];
        }

        setQuestions(list);
        setCurrentIndex(0);
      } catch (err) {
        console.error("Error fetching questions:", err);
        Alert.alert("Error", "Could not load questions. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmitAnswer = () => {
    if (!totalQuestions) return;

    if (!userAnswer.trim()) {
      Alert.alert("Answer required", "Please enter an answer first.");
      return;
    }

    const currentQuestion = questions[currentIndex];
    const correctAnswer = (currentQuestion.answer || "").trim().toLowerCase();
    const userAns = userAnswer.trim().toLowerCase();

    if (userAns === correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }

    setUserAnswer("");

    // Move to next question or finish
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleSaveScore = async () => {
    if (!name.trim()) {
      Alert.alert("Name required", "Please enter your name to save your score.");
      return;
    }

    try {
      setSavingScore(true);
      await addDoc(collection(db, "leaderboard"), {
        name: name.trim(),
        score: scorePercent,
        createdAt: Timestamp.now(),
      });
      Alert.alert("Saved!", "Your score has been saved to the leaderboard.");
      navigation.navigate("LeaderBoard");
    } catch (err) {
      console.error("Error saving score:", err);
      Alert.alert("Error", "Could not save score. Please try again.");
    } finally {
      setSavingScore(false);
    }
  };

  const handleRestart = () => {
    // Re-shuffle and restart game
    if (!questions.length) return;

    const newList = [...questions];
    for (let i = newList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newList[i], newList[j]] = [newList[j], newList[i]];
    }

    setQuestions(newList);
    setCurrentIndex(0);
    setUserAnswer("");
    setCorrectCount(0);
    setIsFinished(false);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Loading questions...</Text>
      </View>
    );
  }

  if (!questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          No study questions found. Please create some first.
        </Text>
        <Button
          title="Create Study Materials"
          onPress={() => navigation.navigate("CreateOptions")}
        />
        <Button title="Back Home" onPress={() => navigation.navigate("Home")} />
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Game</Text>

      <TextInput
        style={styles.nameInput}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {!isFinished ? (
        <>
          <Text style={styles.progressText}>
            Question {currentIndex + 1} of {totalQuestions}
          </Text>

          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          <TextInput
            style={styles.answerInput}
            placeholder="Type your answer"
            value={userAnswer}
            onChangeText={setUserAnswer}
            multiline
          />

          <Button title="Submit Answer" onPress={handleSubmitAnswer} />

          <Text style={styles.scoreText}>Current Score: {scorePercent}%</Text>

          <View style={{ marginTop: 10 }}>
            <Button
              title="Back to Study Materials"
              onPress={() => navigation.navigate("StudyMaterialList")}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.finalScoreText}>
            Final Score: {scorePercent}%
          </Text>
          <Text style={styles.summaryText}>
            You answered {correctCount} out of {totalQuestions} correctly.
          </Text>

          <View style={{ marginTop: 10 }}>
            <Button
              title={savingScore ? "Saving..." : "Save Score to Leaderboard"}
              onPress={handleSaveScore}
              disabled={savingScore}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Button title="Play Again" onPress={handleRestart} />
          </View>

          <View style={{ marginTop: 10 }}>
            <Button
              title="View Leaderboard"
              onPress={() => navigation.navigate("LeaderBoard")}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Button title="Home" onPress={() => navigation.navigate("Home")} />
          </View>
        </>
      )}
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
  nameInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    minHeight: 60,
    marginBottom: 12,
  },
  scoreText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
  },
  finalScoreText: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
  },
});

export default GameScreen;
