import { StyleSheet, Image, Text, Platform, View } from "react-native";
import React, { useState } from "react";
import { Appbar, Divider, TextInput } from "react-native-paper";
import Select from "../../Select";
import MultiSelect from "../../select/MultiSelect";
import { Feather } from "@expo/vector-icons";
import Button from "../../Button";
import { router } from "expo-router";

const Create = () => {
  const [email, setEmail] = useState("");
  return (
    <View>
      <Appbar.Header>
        {Platform.OS !== "web" && (
          <Appbar.BackAction onPress={() => router.back()} />
        )}
        <Appbar.Content title="Generate Coupon" />
      </Appbar.Header>
      <Divider style={{ marginVertical: 20 }} />
      <View style={{ paddingHorizontal: 20 }}>
        <View style={styles.imageCont}>
          <Image
            source={require("../../../../assets/images/product.png")}
            style={[styles.image]}
          />
          <Feather name="upload" size={20} />
        </View>

        <TextInput
          mode="outlined"
          label="Coupon Tag"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.input, { paddingLeft: 20 }]}
        />
        <TextInput
          mode="outlined"
          label="Coupon ID"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.input, { paddingLeft: 20 }]}
        />
        <Select
          placeholder="Coupon Type"
          options={[]}
          onValueChange={() => {}}
          containerStyle={styles.select}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginBottom: 15,
          }}
        >
          <TextInput
            mode="outlined"
            label="Coupon Value"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[styles.input, { flex: 1 }]}
          />
          <TextInput
            mode="outlined"
            label="Expire Date"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[styles.input, { flex: 1 }]}
          />
        </View>
        <MultiSelect
          onValuesChange={(value) => {}}
          options={[]}
          placeholder="Recipient"
          containerStyle={{ flex: 1, marginBottom: 20 }}
        />
        <Button>Save</Button>
      </View>
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    height: 50,
  },
  select: {
    backgroundColor: "white",
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
  },
  imageCont: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
});
