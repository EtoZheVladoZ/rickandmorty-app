import React from "react";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Button, Typography } from "@mui/material";

const ShowMore = ({ onClick }) => {
  return (
    <Button onClick={onClick} sx={{ display: "flex", m: "20px auto" }}>
      <AutorenewIcon />
      <Typography>Show more...</Typography>
    </Button>
  );
};

export default ShowMore;
