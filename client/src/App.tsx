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
            {console.log(data)}
            {data?.cod !== "400" && data?.cod !== "404" && data ? (
              <div className="current">
                <h2>{data?.name}</h2>
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
