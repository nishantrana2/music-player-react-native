import React, { useEffect } from "react";
import DisplayTracks from "./DisplayTracks";

const PlaylistsHelper = ({ navigation, route }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Playlist: " + route.params.playlistName,
    });
  }, []);

  return <></>;
};

export default PlaylistsHelper;
