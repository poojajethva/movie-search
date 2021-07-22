import React, { useState, useEffect, useRef } from "react";

const Autocomplete = ({ getSelectedValue }) => {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

//   const debounce = (func) => {
//     let timer;
//     return function (...args) {
//       const context = this;
//       if (timer) clearTimeout(timer);
//       timer = setTimeout(() => {
//         timer = null;
//         func.apply(context, args);
//       }, 300);
//     };
//   };

  useEffect(() => {
    const cleanTimeout = setTimeout(()=>{

      if (search.length < 3) {
        setOptions([]);
        setDisplay(false);
      } else {
        fetch(`https://www.omdbapi.com/?s=${search}&page=1&apikey=64bd85e7`)
          .then((res) => res.json())
          .then((res) => {
            if (res.Search) {
              let results =
                res.Search.length > 5 ? res.Search.slice(0, 5) : res.Search;
              setOptions(results);
                setDisplay(true);
            } else {
              setOptions([]);
            }
          })
          .catch((err) => {
            setOptions([]);
          });
      }
    },300);
    return () => {
      console.log("clean" )
      clearTimeout(cleanTimeout);
    }
  }, [search]);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const updateVal = (val) => {
    setSearch(val);
    setDisplay(false);
    getSelectedValue(val);
  };

  return (
    <div ref={wrapperRef} className="autocompleteWrapper">
      <input
        type="text"
        placeholder="Search movies / series"
        onClick={() => setDisplay(!display)}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {display && (
        <div className="autoContainer">
          {options &&
            options.map(({ Title }, i) => {
              return (
                <div
                  onClick={() => updateVal(Title)}
                  className="option"
                  key={i}
                  tabIndex="0"
                >
                  <span>{Title}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
