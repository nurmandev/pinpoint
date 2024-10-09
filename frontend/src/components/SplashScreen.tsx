import { StyleSheet, View, Image } from "react-native";
import { Text } from "react-native-paper";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo2.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Support small business.</Text>
        <Text style={styles.text}>The backbone of the American economy.</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  logoContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
  },
  textContainer: { alignItems: "center" },
  text: { fontSize: 14, fontWeight: "500" },
});
