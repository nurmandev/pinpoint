import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Button from "../../Button";

const NearBy: React.FC<{ item: any }> = () => {
  return (
    <View style={[styles.userInfo]}>
      <Image
        source={require("../../../../assets/images/slide1.png")}
        style={styles.userAvatar}
      />
      <View style={styles.userDetails}>
        <Text
          // onPress={() => router.push("/location")}
          style={[styles.username, { color: "black" }]}
        >
          Usernae Name
        </Text>
        <Text style={styles.location}>@username</Text>
      </View>
      <View>
        <Button
          variant="outlined"
          containerStyle={{
            maxHeight: 30,
            paddingHorizontal: 50,
            backgroundColor: "white",
          }}
          textStyle={{ color: "black", fontWeight: "400" }}
        >
          Follow
        </Button>
      </View>
    </View>
  );
};

export default NearBy;

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderColor: "#ddd",
    borderWidth: 1,
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontWeight: "bold",
    color: "white",
  },
  location: {
    color: "#888",
  },
});
