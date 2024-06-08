import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MusicContext } from "../utilities/store";
import { Audio } from "expo-av";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Progress from "react-native-progress";

const DisplayTracks = ({ navigation, screenType, playlistName }) => {
  const storeData = useContext(MusicContext); // current state of the initialState defined within useReducer (/utilities/store.js)
  const [tracksState, setTracksState] = useState([]); // list containing music track objects
  const [isPlaying, setIsPlaying] = useState(false); // music is currently playing or not
  const [selectedItemId, setSelectedItemId] = useState(null); // ID of the currently selected or playing music track
  const [progress, setProgress] = useState(0); // current state of the progress bar (between 0 and 1 inclusive)
  const [nowPlaying, setNowPlaying] = useState(""); // name and performer of the currently playing music track
  const [currentTrack, setCurrentTrack] = useState(null); // reference to the current playing music object (expo av music object)
  const [duration, setDuration] = useState(null); // duration of the music track in minutes and seconds

  // useEffect hook to remove the current playing track if user navigates to some other screen
  useEffect(() => {
    const removeTrack = async () => {
      await currentTrack.unloadAsync();
    };
    return () => {
      if (currentTrack !== null) removeTrack();
    };
  }, [currentTrack]);

  return <></>;
};

const styles = StyleSheet.create({});

export default DisplayTracks;
