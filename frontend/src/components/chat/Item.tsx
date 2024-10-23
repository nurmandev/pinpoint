import { IMessage } from "@/src/types/message";
import moment from "moment";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Decline from "../menu/inquiry/Decline";
import { lightColors } from "@/src/utils/colors";
import { useUser } from "@/src/context/User";

export const Item = ({ item }: { item: IMessage }) => {
  const { user } = useUser();
  if (item.offer) {
    return (
      <View style={styles.offerContainer}>
        <Text style={styles.offerText}>{item.content}</Text>
        <View style={styles.offerContentContainer}>
          <Text style={styles.offerDetails}>
            {/* Price for service: {item.offer.price} */}
          </Text>
          <Text style={styles.offerDetails}>
            {/* Service name: {item.offer.serviceName} */}
          </Text>
        </View>
        <View style={styles.offerButtons}>
          <Decline />
          <TouchableOpacity style={styles.approveButton}>
            <Text style={styles.approveButtonText}>Approve</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.timeText}>{moment(item.createdAt).calendar()}</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        alignItems: item.sender === user?._id ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={[
          styles.messageContainer,
          item.sender === user?._id ? styles.userMessage : styles.otherMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sender !== user?._id && { color: "black" },
          ]}
        >
          {item.content}
        </Text>
      </View>
      <Text
        style={[
          styles.timeText,
          { textAlign: item.sender === "user" ? "left" : "right" },
        ]}
      >
        {moment(item.createdAt).calendar()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: "60%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: lightColors.colors.primary,
    color: "white",
    borderTopLeftRadius: 10,
  },
  otherMessage: {
    backgroundColor: "#d8d8d8",
    borderTopRightRadius: 10,
  },
  messageText: {
    color: "#fff",
  },
  timeText: {
    marginTop: 5,
    marginBottom: 10,
  },
  offerContainer: {
    alignSelf: "flex-start",
    maxWidth: "60%",
    // borderRadius: 20,
    // backgroundColor: lightColors.colors.primary,
    // padding: 10,
    marginVertical: 5,
  },
  offerText: {
    // color: "#fff",
    // fontWeight: "bold"
    fontSize: 18,
  },
  offerDetails: {
    color: "#fff",
    marginVertical: 5,
  },
  offerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  declineButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#fff",
    flex: 1,
    marginRight: 5,
  },
  approveButton: {
    borderColor: lightColors.colors.primary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    flex: 1,
    marginLeft: 5,
  },
  declineButtonText: {
    textAlign: "center",
  },
  approveButtonText: {
    color: lightColors.colors.primary,
    textAlign: "center",
  },
  offerContentContainer: {
    // maxWidth: "60%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    marginVertical: 5,
    backgroundColor: lightColors.colors.primary,
    borderTopRightRadius: 10,
  },
});
