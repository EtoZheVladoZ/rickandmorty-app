import React, { useState, useEffect } from "react";
import axios from "axios";

import { Grid, Box } from "@mui/material";

import Item from "../components/Item";
import ShowMore from "../components/ShowMore";

const Home = () => {
  const [characterList, setCharacterList] = useState(null);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character/?page=1")
      .then(({ data }) => {
        setCharacterList(data.results);
        setNextPage(data.info.next);
      });
  }, []);

  const showMore = () => {
    nextPage &&
      axios.get(nextPage).then(({ data }) => {
        setCharacterList([...characterList, ...data.results]);
        setNextPage(data.info.next);
      });
  };

  return (
    <div>
      <Grid
        container
        sx={{ m: 0, pt: 4 }}
        columns={4}
        justifyContent="space-between"
        rowSpacing={3}
      >
        {characterList &&
          characterList.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              status={item.status}
            />
          ))}
      </Grid>
      {nextPage ? <ShowMore onClick={showMore} /> : ""}
      <Box sx={{ pb: "35px" }} />
    </div>
  );
};

export default Home;
