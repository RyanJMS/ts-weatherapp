import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import cities from "../assets/city_names.json";
import theme from "./theme.module.css";
interface City {
  name: string;
}

interface Props {
  getWeather: (cityName: string) => void;
}

const Search = ({ getWeather }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : cities.filter(
          (city) => city.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (
    _: any,
    { suggestionValue }: { suggestionValue: string }
  ) => {
    setInputValue(suggestionValue);
    getWeather(suggestionValue);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      getWeather(inputValue);
    }
  };

  const renderSuggestion = (city: City) => <div>{city.name}</div>;

  const inputProps = {
    placeholder: "Search for a city",
    value: inputValue,
    onChange: (_: any, { newValue }: { newValue: string }) =>
      setInputValue(newValue),
    onKeyDown,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={(city) => city.name}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={theme}
    />
  );
};

export default Search;
