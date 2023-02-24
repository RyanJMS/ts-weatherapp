import { ReactEventHandler, useState } from "react";
import "./index.css";
import { Dashboard } from "./components/Dashboard";
import Search from "./components/Search";

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
    sys: {
      country: string;
      sunrise: any;
      sunset: any;
    };
    timezone: any;
  }

  let tempC;
  let tempF;
  let feelsC;
  let feelsF;
  let minC;
  let minF;
  let maxC;
  let maxF;
  let icon = data?.weather[0]?.icon;
  let description = data?.weather[0]?.main;
  let name = data?.name;
  let country = data?.sys?.country;
  let timezone = data?.timezone;
  let sunrise = data?.sys?.sunrise;
  let sunset = data?.sys?.sunset;

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
          {/* <div className="search">
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
          </div> */}
          <Search data={data} getWeather={getWeather} />
          <>
            {console.log(data)}
            {data?.cod !== "400" && data?.cod !== "404" && data ? (
              <Dashboard
                handleChange={handleChange}
                getWeather={getWeather}
                tempC={tempC}
                tempF={tempF}
                feelsC={feelsC}
                feelsF={feelsF}
                minC={minC}
                minF={minF}
                maxC={maxC}
                maxF={maxF}
                icon={icon}
                name={name}
                description={description}
                country={country}
                timezone={timezone}
                sunrise={sunrise}
                sunset={sunset}
              />
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
