import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ProfileInfo from "../components/ProfileInfo";

const Profile = () => {
  let { characterId } = useParams();
  const [profileInfo, setProfileInfo] = useState(null);
  const [episodesInfo, setEpisodesInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then(({ data }) => {
        setProfileInfo(data);
      });
  }, [characterId]);

  useEffect(() => {
    profileInfo &&
      axios
        .all(profileInfo.episode.map((url) => axios.get(url)))
        .then((data) => {
          setEpisodesInfo(data);
        });
  }, [profileInfo]);

  return (
    <>
      {profileInfo && (
        <ProfileInfo data={profileInfo} episodes={episodesInfo} />
      )}
    </>
  );
};

export default Profile;
