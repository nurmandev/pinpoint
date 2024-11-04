import {
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Appbar, Menu, useTheme } from "react-native-paper";
import Rating from "@/src/components/Rating";
import Button from "@/src/components/Button";
import MultiSelect from "@/src/components/select/MultiSelect";
import { reportOption } from "@/src/components/social/ReelItem";
import { useProduct } from "@/src/context/Product";
import { IProduct } from "@/src/types/product";
import LoadingOverlay from "@/src/components/LoadingOverlay";
import { imageURL } from "@/src/services/api";
import { useToastNotification } from "@/src/context/ToastNotificationContext";
import { useUser } from "@/src/context/User";
import { createLead, getLeadByItem } from "@/src/services/lead";
import { useLead } from "@/src/context/Lead";
import { Lead } from "@/src/types/lead";
import * as Linking from "expo-linking";

const Detail = () => {
  const { colors } = useTheme();
  const { user } = useUser();
  const { updateStatus } = useLead();
  const { addNotification } = useToastNotification();
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = useState("");
  const [lead, setLead] = useState<Lead | null>(null);

  const { getProduct } = useProduct();
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<IProduct | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creatingLead, setCreatingLead] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const response = await getProduct(id as string);
        setProduct(response);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchLead = async () => {
      if (!product?._id) return;
      try {
        const response = await getLeadByItem(product?._id, "Pending");
        setLead(response.lead);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchLead();
  }, [product]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const availableOptions = [
    product?.availableOnline && "Buy Online",
    product?.ships && "Shipping",
  ].filter(Boolean);

  const handleSubmit = async () => {
    const currentDate = new Date();

    try {
      setCreatingLead(true);
      const leadData = {
        customerName: user!.username,
        email: user!.email,
        address: "",
        serviceRequestDate: currentDate,
        details: message || "Hi, is this Product still in stock?",
        location: product?.location[0]._id || "",
        item: product?._id || "",
      };

      const res = await createLead(leadData);
      setLead(res);
      // router.replace({
      //   pathname: "/service-detail/success",
      //   params: { name: product?.location[0].locationName, id: res._id },
      // });
    } catch (error: any) {
      console.error("Error creating lead:", error);
      addNotification({ message: error, error: true });
    } finally {
      setCreatingLead(false);
    }
  };

  const handleWebsiteClick = async () => {
    try {
      if (lead?._id) {
        updateStatus(lead._id, {
          status: "Website Click",
        });
      }

      if (!product?.productUrl) {
        addNotification({ message: `No product url available`, error: true });
      } else {
        const supported = await Linking.canOpenURL(
          "https://" + product.productUrl
        );
        if (supported) {
          await Linking.openURL("https://" + product.productUrl);
        } else {
          addNotification({
            message: `Can't open this URL: ${product.productUrl}`,
            error: true,
          });
        }
      }
    } catch (error: any) {
      addNotification({
        message: error.message || error,
        error: true,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Details" />

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Ionicons name="ellipsis-vertical" size={25} color="black" />
            </TouchableOpacity>
          }
          anchorPosition="bottom"
          mode="flat"
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/location");
              closeMenu();
            }}
            style={{
              flexDirection: "row",
              gap: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Ionicons name="person-circle-outline" size={20} />
            <Text>View Profile</Text>
          </TouchableOpacity>

          <MultiSelect
            button={
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Ionicons name="flag-outline" size={20} />
                <Text>Report Partner</Text>
              </View>
            }
            options={reportOption}
            onValuesChange={() => {}}
            containerStyle={{ borderWidth: 0 }}
            buttonText="Report"
          />
        </Menu>
      </Appbar.Header>
      {loading ? (
        <LoadingOverlay />
      ) : (
        <>
          <ScrollView>
            <View style={styles.selectedItem}>
              <Image
                source={{ uri: imageURL + product?.images[0] }}
                style={styles.mainImage}
                resizeMode="cover"
              />
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Rating
                rating={product?.rating || 0}
                textStyle={{ color: "black" }}
              />
            </View>
            <View style={styles.info}>
              <View style={{}}>
                <Text style={{ marginBottom: 5 }}>
                  @{product?.user.username}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "500",
                  }}
                >
                  {product?.location.map((loc) => loc.locationName).join(", ")}
                </Text>
              </View>
              <View style={{}}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Ionicons name="location-outline" />
                  <Text style={{ marginBottom: 5 }}>
                    {product?.location.map((loc) => loc.address).join(", ")}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{product?.name}</Text>
              <Text style={styles.sectionText}>{product?.description}</Text>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    marginTop: 10,
                    fontWeight: "bold",
                    fontSize: 20,
                    marginBottom: 0,
                  },
                ]}
              >
                ${product?.price}
              </Text>
            </View>
            <View style={styles.section}>
              {product?.options?.map((option, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", marginBottom: 10 }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: "500",
                      textTransform: "capitalize",
                    }}
                  >
                    {option.optionCategory}:
                  </Text>
                  <Text style={{ flex: 3 }}>{option.optionName}</Text>
                </View>
              ))}
            </View>
            {availableOptions.length > 0 && (
              <View
                style={[
                  styles.section,
                  { flexDirection: "row", alignItems: "center", gap: 5 },
                ]}
              >
                <Text style={{ color: "#888" }}>
                  {availableOptions.join(" + ")}
                </Text>
                <Ionicons name="checkmark" size={15} />
              </View>
            )}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Reviews ({product?.reviews.length})
              </Text>
              {product?.reviews &&
                product.reviews.map((review) => (
                  <View
                    key={review._id}
                    style={{
                      paddingVertical: 15,
                      borderBottomWidth: 1,
                      borderBottomColor: "#e8e8e8",
                    }}
                  >
                    <Rating rating={5} show={false} />
                    <Text
                      style={[
                        styles.sectionText,
                        { fontWeight: "500", marginVertical: 3 },
                      ]}
                    >
                      {/* {review.title} */}
                    </Text>
                    {review.content && (
                      <Text style={[styles.sectionText, { marginBottom: 8 }]}>
                        {review.content}
                      </Text>
                    )}
                    <View
                      style={{ flexDirection: "row", gap: 5, marginBottom: 8 }}
                    >
                      {/* {review.images.map((image, index) => (
                        <Image
                          key={index}
                          source={image}
                          style={{ width: 50, height: 50, borderRadius: 8 }}
                          resizeMode="cover"
                        />
                      ))} */}
                    </View>
                    {/* <Text style={[styles.sectionText, { fontWeight: "500" }]}>
                      {review.user}
                    </Text>
                    <Text style={styles.sectionText}>{review.date}</Text> */}
                  </View>
                ))}
            </View>
          </ScrollView>
          <View style={styles.inputContainer}>
            {lead ? (
              <>
                <Button onPress={handleWebsiteClick}>View Website</Button>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#D67732",
                    paddingVertical: 15,
                    fontSize: 16,
                  }}
                >
                  No payments are made through our platform
                </Text>
              </>
            ) : (
              <>
                <View
                  style={[styles.inputCont, { borderColor: colors.primary }]}
                >
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => setMessage(text)}
                    value={message || "Hi, is this Product still in stock?"}
                    placeholderTextColor={"gray"}
                  />
                  {creatingLead ? (
                    <ActivityIndicator />
                  ) : (
                    <TouchableOpacity
                      style={styles.sendButton}
                      onPress={() => handleSubmit()}
                    >
                      <Ionicons name="send" size={24} color={colors.primary} />
                    </TouchableOpacity>
                  )}
                </View>
                {!message && (
                  <View
                    style={{
                      borderWidth: 1,
                      borderRadius: 20,
                      alignSelf: "flex-start",
                      padding: 5,
                      marginVertical: 10,
                      borderColor: "#e1e1e1",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                      }}
                      onPress={() =>
                        setMessage(
                          "I would like to discuss more about this Product"
                        )
                      }
                    >
                      I would like to discuss more about this Product
                    </Text>
                  </View>
                )}
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default Detail;

const { width: WIDTH } = Dimensions.get("screen");
const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 50,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    zIndex: 20,
  },
  selectedItem: {
    width: WIDTH,
    height: WIDTH * 0.8,
    borderBottomColor: "white",
    borderBottomWidth: 5,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  userDetail: {
    position: "absolute",
    left: 0,
    bottom: 0,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-end",
  },
  name: {},
  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "200",
    marginVertical: 8,
  },
  fullname: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  other: {},
  badge: { flexDirection: "row", gap: 1, justifyContent: "flex-end" },
  followerCont: { flexDirection: "column", alignItems: "flex-end", gap: 8 },
  followers: {
    borderWidth: 1,
    borderColor: "white",
    padding: 8,
    borderRadius: 5,
  },
  followersText: { color: "white", fontSize: 20 },
  otherpics: {
    width: 60,
    height: 40,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "white",
  },
  badgeImage: {
    width: 30,
    height: 30,
  },
  otherContent: {},
  info: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 15,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 15,
    borderBlockColor: "#e1e1e1",
    borderBottomWidth: 1,
  },
  tabcont: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 2,
    paddingHorizontal: 15,
    paddingTop: 15,
    borderBottomColor: "gray",
  },
  tab: {
    borderRadius: 5,
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  tabText: { fontSize: 19 },

  section: {
    // marginBottom: 16,
    paddingVertical: 24,
    padding: 16,
    borderBlockColor: "#e1e1e1",
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 14,
    color: "#555",
  },
  card: {
    borderRadius: 20,
    marginRight: 16,
    width: 160,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 20,
    marginBottom: 8,
  },
  inputContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    padding: 8,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  inputCont: {
    // flex: 1,
    borderRadius: 20,
    // height: "100%",
    borderColor: "#f0f0f0",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    // height: "100%",
    fontSize: 18,
    padding: 12,
  },
  sendButton: {
    marginLeft: 8,
  },
});
