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
import { Appbar, Menu, useTheme } from "react-native-paper";
import Rating from "@/src/components/Rating";
import Button from "@/src/components/Button";
import MultiSelect from "@/src/components/select/MultiSelect";
import { reportOption } from "@/src/components/social/ReelItem";
import { useService } from "@/src/context/Service";
import { IService } from "@/src/types/service";
import LoadingOverlay from "@/src/components/LoadingOverlay";
import { imageURL } from "@/src/services/api";
import moment from "moment";

const Detail = () => {
  const [visible, setVisible] = React.useState(false);

  const { getService } = useService();
  const { id } = useLocalSearchParams();
  const [service, setService] = useState<IService | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchService = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const response = await getService(id as string);
        setService(response);
        console.log(response);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchService();
  }, [id]);
  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const availableOptions = [service?.homeService && "In-Home Service"].filter(
    Boolean
  );

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
              <View
                style={{ flexDirection: "row", gap: 10, paddingHorizontal: 15 }}
              >
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
                source={{ uri: imageURL + service?.images[0] }}
                style={styles.mainImage}
                resizeMode="cover"
              />
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Rating
                rating={service?.rating || 0}
                textStyle={{ color: "black" }}
              />
            </View>
            <View style={styles.info}>
              <View style={{}}>
                <Text style={{ marginBottom: 5 }}>
                  @{service?.user.username}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "500",
                  }}
                >
                  {service?.location.map((loc) => loc.locationName).join(", ")}
                </Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5, flex: 1 }}>
                <Ionicons name="location-outline" />
                <Text style={{ marginBottom: 5 }}>
                  {service?.location.map((loc) => loc.address).join(", ")}
                </Text>
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{service?.name}</Text>
              <Text style={styles.sectionText}>{service?.description}</Text>
              <Text
                style={[
                  styles.sectionTitle,
                  { marginTop: 10, fontWeight: "bold", fontSize: 20 },
                ]}
              >
                {service?.priceType === "flat"
                  ? `$${service.price}`
                  : `$${service?.priceRange?.from} - $${service?.priceRange?.to}`}
              </Text>
              {service?.options?.map((option, index) => (
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
                  { flexDirection: "row", gap: 5, alignItems: "center" },
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
                Reviews ({service?.reviews?.length})
              </Text>
              {service?.reviews.map((review) => (
                <View
                  key={review._id}
                  style={{
                    paddingBottom: 15,
                  }}
                >
                  <Rating rating={review.rating} show={false} />
                  {review.content && (
                    <Text
                      style={[
                        styles.sectionText,
                        { marginBottom: 8, marginTop: 4 },
                      ]}
                    >
                      {review.content}
                    </Text>
                  )}
                  {/* <View
                    style={{ flexDirection: "row", gap: 5, marginBottom: 8 }}
                  >
                    {review.images.map((image, index) => (
                      <Image
                        key={index}
                        source={image}
                        style={{ width: 50, height: 50, borderRadius: 8 }}
                        resizeMode="cover"
                      />
                    ))}
                  </View> */}
                  <Text
                    style={[
                      styles.sectionText,
                      { fontWeight: "600", marginBottom: 4 },
                    ]}
                  >
                    {review.userId.username}
                  </Text>
                  <Text style={styles.sectionText}>
                    {moment(review.createdAt).calendar()}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() =>
                router.push({
                  pathname: "/service-detail/inquire",
                  params: { id: service?._id },
                })
              }
            >
              Inquire
            </Button>
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
    gap: 15,
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
  buttonContainer: {
    padding: 8,
    paddingHorizontal: 16,
    paddingBottom: 30,
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
