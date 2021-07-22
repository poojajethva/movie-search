import React, { useState, useEffect } from "react";
import "./App.css";
import Autocomplete from "./components/Autocomplete";
import ShowCard from "./components/ShowCard";

function App() {
  const [searchedVal, setSearchedVal] = useState("");
  const [singleDetails, setSingleDetails] = useState(null);

  useEffect(() => {
    if (searchedVal.length > 2) {
      fetch(`https://www.omdbapi.com/?t=${searchedVal}&page=1&apikey=64bd85e7`)
        .then((res) => res.json())
        .then((res) => {
          setSingleDetails(res);
        });
    }
  }, [searchedVal]);
  const getSelectedValue = (val) => {
    setSearchedVal(val);
  };
  return (
    <div className="App">
      <h2>Search Your Favorite Movies / Series</h2>
      <Autocomplete getSelectedValue={getSelectedValue} />
      {!!singleDetails ? <ShowCard val={singleDetails} /> : ""}
    </div>
  );
}

export default App;
