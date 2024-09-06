import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ whenNumberPicked }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();

  function numberInputHandler(guessedNumber) {
    setEnteredNumber(guessedNumber);
  }
  function resetInputField() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number", "Number must be between 1 and 99", [
        { text: "Okay", style: "destructive", onPress: resetInputField },
      ]);
    } else {
      whenNumberPicked(chosenNumber);
    }
  }

  const marginTopLandscape = height < 400 ? 55 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior="position">
        <View style={[styles.rootCont, { marginTop: marginTopLandscape }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.InputNumber}
              maxLength={2}
              keyboardType="number-pad"
              value={enteredNumber}
              onChangeText={numberInputHandler}
            />
            <View style={styles.buttonsCtn}>
              <View style={styles.buttonCtn}>
                <PrimaryButton whenPressed={resetInputField}>
                  Reset
                </PrimaryButton>
              </View>
              <View style={styles.buttonCtn}>
                <PrimaryButton whenPressed={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootCont: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    backgroundColor: Colors.primary800,
    padding: 16,
    marginHorizontal: 24,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: "0.25",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  InputNumber: {
    height: 50,
    width: 50,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    fontSize: 32,
    textAlign: "center",
  },
  buttonsCtn: {
    flexDirection: "row",
    marginTop: 10,
  },
  buttonCtn: {
    flex: 1,
  },
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
  },
});
export default StartGameScreen;
