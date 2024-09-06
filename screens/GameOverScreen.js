import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Platform,
} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundNumber, userNumber, onStartNewgame }) {
  const { height, width } = useWindowDimensions();

  let picMargin = 36;

  if (width > height) {
    picMargin = 12;
  }

  let imageSize = 300;
  if (width < 370) {
    imageSize = 150;
  }
  if (height < 400) {
    imageSize = 100;
  }

  const ImageStyle = {
    margin: Platform.OS == "android" ? picMargin : 33,
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  return (
    <ScrollView style={styles.screen}>
      <View style={[styles.rootCtn]}>
        <Title>Game Over!</Title>
        <View style={[styles.imageCtn, ImageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/pngtree-mountain-road-symbol-of-successful-goal-achievement-landscape-competition-adult-vector-png-image_45351660.jpg")}
          />
        </View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <PrimaryButton whenPressed={onStartNewgame}>
          Start new game
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootCtn: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imageCtn: {
    borderWidth: 3,
    borderColor: Colors.accent500,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "120%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
export default GameOverScreen;
