import Title from "../components/ui/Title";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import { MaterialIcons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

function randomNumberGenerator(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return randomNumberGenerator(min, max, exclude);
  } else {
    return rndNum;
  }
}
let minBoundary = 1;
let maxboundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = randomNumberGenerator(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxboundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", "You know this is wrong...", [
        { text: "Sorry!", style: "default" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxboundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNum = randomNumberGenerator(
      minBoundary,
      maxboundary,
      currentGuess
    );
    setCurrentGuess(newRndNum);
    setGuessRounds((prevGuessRounds) => [newRndNum, ...prevGuessRounds]);
  }

  let andriodMT = 50;
  if (Platform.OS == "android" && height > width) {
    andriodMT = 50;
  }

  let androidstyle = {
    marginTop: andriodMT,
  };

  const guessRoundLength = guessRounds.length;
  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.cardContainer}>
        <InstructionText style={styles.InstructionText}>
          Higher or Lower
        </InstructionText>
        <View style={styles.buttonsCtn}>
          <View style={styles.buttonCtn}>
            <PrimaryButton whenPressed={() => nextGuessHandler("lower")}>
              <MaterialIcons name="remove" size={20} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonCtn}>
            <PrimaryButton whenPressed={() => nextGuessHandler("greater")}>
              <MaterialIcons name="add" size={20} />
            </PrimaryButton>
          </View>
        </View>
      </View>
    </>
  );

  if (width > 500) {
    content = (
      <View style={styles.wideScreen}>
        <View style={[styles.buttonCtn, styles.wideButton]}>
          <PrimaryButton whenPressed={() => nextGuessHandler("lower")}>
            <MaterialIcons name="remove" size={24} />
          </PrimaryButton>
        </View>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={[styles.buttonCtn, styles.wideButton]}>
          <PrimaryButton whenPressed={() => nextGuessHandler("greater")}>
            <MaterialIcons name="add" size={24} />
          </PrimaryButton>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.screen, androidstyle]}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listCtn}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsCtn: {
    flexDirection: "row",
    marginTop: 10,
  },
  buttonCtn: {
    flex: 1,
  },
  wideButton: {
    maxWidth: "40%",
  },
  wideScreen: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
  },
  InstructionText: {
    marginBottom: 10,
  },
  listCtn: {
    flex: 1,
    padding: 16,
    width: "100%",
  },
  cardContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameScreen;
