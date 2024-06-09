import React from "react";
import DisplayTracks from "./DisplayTracks";

const FavoritesScreen = ({ navigation }) => {
  return <DisplayTracks screenType="favorites" navigation={navigation} />;
};

export default FavoritesScreen;
