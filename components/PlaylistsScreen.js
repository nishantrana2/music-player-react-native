import React, { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MusicContext } from "../utilities/store";
import Entypo from "react-native-vector-icons/Entypo";

const PlaylistsScreen = ({ route, navigation }) => {
  const storeData = useContext(MusicContext); // current state of the initialState defined within useReducer (/utilities/store.js)
  const [playlists, setPlayLists] = useState([]); // list containing names of the playlists

  return <></>;
};

const styles = StyleSheet.create({});

export default PlaylistsScreen;
