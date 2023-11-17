import { useEffect, useRef, useState } from "react";
import { Searchbar } from "react-native-paper";
import { debounce } from "lodash";

type SearchInputProps = {
  onSearch: (text: string) => void;
};

function SearchInput({ onSearch }: SearchInputProps) {
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
    <Searchbar
      placeholder="Search"
      value={searchQuery}
      onChangeText={(text) => handleChangeText(text)}
    />
  );
}

export default SearchInput;
