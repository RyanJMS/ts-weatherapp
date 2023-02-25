import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import cities from "../assets/city_names.json";
import theme from "./theme.module.css";

interface City {
  name: string;
  country?: string;
}

interface Props {
  getWeather: (cityName: string) => void;
  data?: any;
}

const Search = ({ getWeather, data }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [cityNotFound, setCityNotFound] = useState("");
  const [notFound, setNotFound] = useState<boolean>(false);
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : cities.filter(
          (city) => city.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNotFound(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [notFound]);

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
    const city = cities.find(
      (c) => c.name.toLowerCase() === suggestionValue.toLowerCase()
    );
    if (city) {
      setNotFound(false);
      setInputValue(suggestionValue);
      getWeather(suggestionValue);
    } else {
      setNotFound(true);
      setCityNotFound(suggestionValue);
      // handle error, e.g. display an error message
      console.error(`City "${suggestionValue}" not found.`);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const city = cities.find(
        (c) => c.name.toLowerCase() === inputValue.toLowerCase()
      );
      if (city) {
        setNotFound(false);
        getWeather(inputValue);
      } else {
        // handle error, e.g. display an error message
        console.error(`City "${inputValue}" not found.`);
        setNotFound(true);
        setCityNotFound(inputValue);
      }
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
    <>
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
      {notFound ? (
        <p className="notFound">
          {cityNotFound
            ? `${cityNotFound} not found. Please try again.`
            : "Please enter a city. "}
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default Search;
