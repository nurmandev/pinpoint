import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { ReactNode, useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Menu } from "react-native-paper";
import More from "./More";
import Modal from "@/src/components/modals/modal";
// import * as Clipboard from "expo-clipboard";

interface Props {
  buttonStyle?: StyleProp<ViewStyle>;
  icon?: ReactNode;
}

const Share: React.FC<Props> = ({ buttonStyle, icon }) => {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const copyToClipboard = async () => {
    // await Clipboard.setStringAsync("http://pinpoint.com");
    setCopied(true);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <TouchableOpacity
          onPress={openMenu}
          style={[styles.actionButton, buttonStyle]}
        >
          {icon ? (
            icon
          ) : (
            <Ionicons name="paper-plane-outline" size={24} color="black" />
          )}
        </TouchableOpacity>
      }
      anchorPosition="bottom"
      mode="flat"
    >
      <Text style={{ marginBottom: 10, textAlign: "center" }}>Share to</Text>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          padding: 5,
          paddingLeft: 15,
          maxWidth: 300,
        }}
      >
        <FlatList
          data={[] as string[]}
          ListHeaderComponent={() => (
            <TouchableOpacity
              onPress={() => copyToClipboard}
              style={{ alignItems: "center", marginRight: 18 }}
            >
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor: "#e1e1e1",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Ionicons name="link-outline" size={20} />
              </View>
              <Text style={{ fontSize: 12 }}>
                {!copied ? "Copy Link" : "Copied"}
              </Text>
            </TouchableOpacity>
          )}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center", marginRight: 18 }}>
              <Image
                source={require("../../../../../assets/images/user1.png")}
                style={styles.avatar}
              />
              <Text style={{ fontSize: 12 }}>Username</Text>
            </View>
          )}
          ListFooterComponent={() => (
            <Modal
              button={
                <View style={{ alignItems: "center", marginRight: 18 }}>
                  <View
                    style={[
                      styles.avatar,
                      {
                        backgroundColor: "#e1e1e1",
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Entypo name="dots-three-horizontal" size={20} />
                  </View>
                  <Text style={{ fontSize: 12 }}>More</Text>
                </View>
              }
            >
              <More />
            </Modal>
          )}
          keyExtractor={(item) => item.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Menu>
  );
};

export default Share;

const styles = StyleSheet.create({
  actionButton: {
    marginRight: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
  },
});
