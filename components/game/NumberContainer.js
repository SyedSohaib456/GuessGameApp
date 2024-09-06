import { View, Text, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";
function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.accent500,
    padding: deviceWidth < 370 ? 12 : 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    margin: deviceWidth < 370 ? 12 : 24,
    backgroundColor: Colors.primary800,
    maxWidth: "50%",
    width: 100,
  },
  numberText: {
    color: Colors.accent500,
    fontSize: deviceWidth < 370 ? 28 : 36,
    fontWeight: "bold",
  },
});

export default NumberContainer;
