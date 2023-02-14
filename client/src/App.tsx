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

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <div className="search">
            <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
            <input
              type="text"
              className="searchBar"
              placeholder="Search Here"
              onChange={handleChange}
              value={searchInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
