import React from "react";
import DisplayTracks from "./DisplayTracks";

const TracksScreen = ({ navigation }) => {
  return (
    <>
      <DisplayTracks navigation={navigation} screenType="tracks" />
    </>
  );
};

export default TracksScreen;
