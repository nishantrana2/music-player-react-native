import React, { useEffect } from "react";
import DisplayTracks from "./DisplayTracks";

const PlaylistsHelper = ({ navigation, route }) => {
  /* DO NOT EDIT BELOW THIS LINE */

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Playlist: " + route.params.playlistName,
    });
  }, []);

  /* DO NOT EDIT ABOVE THIS LINE */

  return (
    <DisplayTracks
      screenType="playlists"
      playlistName={route.params.playlistName}
    />
  );
};

export default PlaylistsHelper;
