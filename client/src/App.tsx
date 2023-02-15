import { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const getWeather = (city: String) => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        import.meta.env.VITE_API_KEY
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <div className="search">
            <input
              onKeyDown={(e) => {
                e.key === "Enter" ? getWeather(searchInput) : "";
              }}
              type="text"
              className="searchBar"
              placeholder="Search Here"
              onChange={handleChange}
              value={searchInput}
            />
            <button onClick={() => getWeather(searchInput)}>
              <FontAwesomeIcon
                className="searchIcon"
                icon={faMagnifyingGlass}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
