import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Appbar } from "react-native-paper";

interface SearchItem {
  id: string;
  name: string;
}

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredResults, setFilteredResults] = useState<SearchItem[]>([]);
  const [allItems, setAllItems] = useState<SearchItem[]>([
    { id: "1", name: "Location One" },
    { id: "2", name: "Location Two" },
    { id: "3", name: "Location Three" },
    { id: "4", name: "Park Avenue" },
    { id: "5", name: "Central Plaza" },
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = allItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    }
  };

  const handleItemPress = (item: SearchItem) => {
    // Handle navigation or interaction when a search result is pressed
    console.log("Selected:", item.name);
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: "#fff" }}>
        {router.canGoBack() && (
          <Appbar.BackAction onPress={() => router.back()} />
        )}
        <Appbar.Content title="Search" />
      </Appbar.Header>
      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a location..."
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {/* Results List */}
        <FlatList
          data={filteredResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => handleItemPress(item)}
            >
              <Text style={styles.resultText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            searchQuery ? (
              <Text style={styles.emptyMessage}>
                No results found for "{searchQuery}".
              </Text>
            ) : (
              <Text style={styles.emptyMessage}>Search anything</Text>
            )
          }
        />
      </View>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  searchBar: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  resultItem: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resultText: {
    fontSize: 16,
    color: "#333",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
