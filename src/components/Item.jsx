import React from "react";
import { Link } from "react-router-dom";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";

const Item = ({ id, name, status }) => {
  return (
    <Grid item width="270px">
      <Card sx={{ w: "100%" }}>
        <CardActionArea component={Link} to={`/profile/${id}`}>
          <CardContent>
            <Typography noWrap>{`Name: ${name}`}</Typography>
            <Typography noWrap>{`Status: ${status}`}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Item;
