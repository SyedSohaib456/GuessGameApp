import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../../constants/colors";
function PrimaryButton({ children, whenPressed }) {
  return (
    <View style={styles.ButtonOuterContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.ButtonInnerContainer,
          pressed && styles.pressed,
        ]}
        onPress={whenPressed}
        android_ripple={{ color: Colors.primary600 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  ButtonOuterContainer: {
    borderRadius: 28,
    overflow: "hidden",
    margin: 4,
  },

  ButtonInnerContainer: {
    paddingVertical: 8,
    backgroundColor: "#72063c",
    paddingHorizontal: 16,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
  pressed: {
    opacity: 0.75,
  },
});

export default PrimaryButton;
