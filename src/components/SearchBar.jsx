import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { alpha, styled } from "@mui/material/styles";
import { Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 0.5),
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchBar = () => {
  const [inputValue, setInputValue] = useState(null);
  const [searchList, setSearchList] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://rickandmortyapi.com/api/character/?name=${
          inputValue ? inputValue : ""
        }`
      )
      .then(({ data }) => {
        setSearchList(data.results);
        setNextPage(data.info.next);
      })
      .catch(() => console.log("No results"));
  }, [inputValue]);

  const loadMoreResults = () => {
    nextPage &&
      axios
        .get(nextPage)
        .then(({ data }) => {
          setSearchList([...searchList, ...data.results]);
          setNextPage(data.info.next);
        })
        .catch(() => console.log("No results"));
  };

  const handleScroll = (event) => {
    const listboxNode = event.currentTarget;

    if (
      listboxNode.scrollTop + listboxNode.clientHeight ===
      listboxNode.scrollHeight
    ) {
      loadMoreResults();
    }
  };

  return (
    <>
      <Autocomplete
        freeSolo
        disableClearable
        clearOnEscape
        value={null}
        onInputChange={(e) => setInputValue(e.target.value)}
        options={searchList}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Link key={option.id} to={`/profile/${option.id}`}>
            <li {...props} style={{ color: "#000" }}>
              {option.name}
            </li>
          </Link>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search a character"
            focused
            variant="outlined"
            size={"small"}
            sx={{
              position: "relative",
              borderRadius: 5,
              backgroundColor: alpha("#fff", 0.15),
              "&:hover": {
                backgroundColor: alpha("#fff", 0.25),
              },
              marginLeft: 2,
              width: "250px",
            }}
          />
        )}
        ListboxProps={{
          onScroll: handleScroll,
        }}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
    </>
  );
};

export default SearchBar;
