import { useState } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState<Data | null>(null);

  interface Data {
    name: string;
    weatherID: string;
    cod: string;
    weather: [
      {
        main: string;
        icon: string;
      }
    ];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
    };
  }

  let tempC;
  let tempF;
  let feelsC;
  let feelsF;
  let minC;
  let minF;
  let maxC;
  let maxF;
  if (data) {
    tempC = Math.round(data?.main.temp - 273.15);
    tempF = Math.round((data?.main.temp - 273.15) * (9 / 5) + 32);
    feelsC = Math.round(data?.main.feels_like - 273.15);
    feelsF = Math.round((data?.main.feels_like - 273.15) * (9 / 5) + 32);
    minC = Math.round(data?.main.temp_min - 273.15);
    minF = Math.round((data?.main.temp_min - 273.15) * (9 / 5) + 32);
    maxC = Math.round(data?.main.temp_max - 273.15);
    maxF = Math.round((data?.main.temp_max - 273.15) * (9 / 5) + 32);
  }
  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  async function getWeather(q: string) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        q +
        "&appid=" +
        import.meta.env.VITE_API_KEY
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }

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
          <>
            {data?.cod !== "400" && data?.cod !== "404" && data ? (
              <div className="current">
                <h2 className="cityName">{data?.name}</h2>
                <img
                  className="weatherIcon"
                  alt="weather-icon"
                  src={
                    `http://openweathermap.org/img/wn/` +
                    data?.weather[0].icon +
                    `@2x.png`
                  }
                />
                <p className="description">{data?.weather[0].main}</p>
                <p>
                  Temp: {tempC} &#8451; {tempF} &#8457;
                </p>
                <p>
                  Feels Like: {feelsC} &#8451; {feelsF} &#8457;
                </p>
                <p>
                  Min: {feelsC} &#8451; {feelsF} &#8457;
                </p>
                <p>
                  Max: {maxC} &#8451; {maxF} &#8457;
                </p>
              </div>
            ) : (
              <></>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default App;
