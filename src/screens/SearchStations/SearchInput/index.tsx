import React, { useEffect, useRef, useState } from "react";
import { Searchbar } from "react-native-paper";
import { debounce } from "lodash";
import { TextStyle, View } from "react-native";

interface SearchInputProps {
  onSearch: (text: string) => void;
  style?: TextStyle ;
};

function SearchInput({ onSearch, style }: SearchInputProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryDebounced, setSearchQueryDebounced] = useState("");

  useEffect(() => {
   onSearch(searchQuery); 
  }, [searchQueryDebounced]);

  const debouncedOnChangeText = useRef(debounce((text: string) => {
    setSearchQueryDebounced(text);
  }, 500)).current;

  const handleChangeText = (text: string) => {
    setSearchQuery(text);
    debouncedOnChangeText.cancel();
    debouncedOnChangeText(text);
  }

  return (
    <View style={{ flexDirection: "row", justifyContent: "center"}}>
      <Searchbar
        placeholder="Search"
        value={searchQuery}
        onChangeText={(text) => handleChangeText(text)}
        style={{...{margin: 8}, ...style}}
      />
    </View>
  );
}

export default SearchInput;
