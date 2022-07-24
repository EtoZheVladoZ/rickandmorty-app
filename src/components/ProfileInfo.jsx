import React from "react";

import { Box, Typography } from "@mui/material";

const ProfileInfo = ({ data, episodes }) => {
  let createdDate = new Date(data.created).toLocaleDateString("en-GB");

  return (
    <Box
      sx={{
        margin: "30px auto",
        boxSizing: "border-box",
        padding: "40px 70px",
        borderRadius: 5,
        width: "100%",
        height: "100%",
        backgroundColor: "grey.50",
      }}
    >
      <Typography variant="h4" gutterBottom paragraph>
        Profile
      </Typography>
      <Box sx={{ display: "flex" }} mb={6}>
        <img src={data.image} alt={data.name} />
        <Box ml={3}>
          <Typography gutterBottom paragraph>
            {`Name: ${data.name}`}
          </Typography>
          <Typography gutterBottom paragraph>
            {`Species: ${data.species}`}
          </Typography>
          <Typography gutterBottom paragraph>
            {`Gender: ${data.gender}`}
          </Typography>
          <Typography gutterBottom paragraph>
            {`Location: ${data.location.name}`}
          </Typography>
          <Typography gutterBottom paragraph>
            {`Status: ${data.status}`}
          </Typography>
          <Typography>{`Created: ${createdDate}`}</Typography>
        </Box>
      </Box>

      <Typography variant="h4" gutterBottom paragraph>
        Episodes
      </Typography>
      {episodes.map((episode) => (
        <Typography key={episode.data.id} gutterBottom paragraph>
          {`${episode.data.episode}: ${episode.data.name}`}
        </Typography>
      ))}
    </Box>
  );
};

export default ProfileInfo;
