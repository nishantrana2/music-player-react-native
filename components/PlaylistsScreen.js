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
  /* DO NOT EDIT BELOW THIS LINE */

  const storeData = useContext(MusicContext); // current state of the initialState defined within useReducer (/utilities/store.js)
  const [playlists, setPlayLists] = useState([]); // list containing names of the playlists

  /* DO NOT EDIT ABOVE THIS LINE */

  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setPlayLists(storeData.state.playlists);
  }, [storeData.state.playlists]);

  const playlistHandler = async (item) => {
    navigation.navigate("playlistshelper", {
      playlistName: item.name,
    });
  };

  const renderModal = () => {
    return (
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modal}>
          <TextInput
            style={styles.modalInput}
            placeholder="Enter playlist name"
            placeholderTextColor="black"
            value={inputValue}
            onChangeText={(text) => setInputValue(text)}
          />
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setInputValue("");
                setModalVisible(false);
              }}
            >
              <View
                style={[
                  styles.createPlaylistButton,
                  { width: wp(25), height: hp(6.5) },
                ]}
              >
                <Text style={styles.createPlaylistButtonText}> Cancel </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <View
                style={[
                  styles.createPlaylistButton,
                  { width: wp(42), height: hp(6.5), marginLeft: wp(4) },
                ]}
              >
                <Text style={styles.createPlaylistButtonText}>
                  {" "}
                  Create playlist{" "}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => playlistHandler(item)}
      >
        <View style={styles.playlistButton}>
          <Text style={styles.playlistButtonText}> {item.name} </Text>
          <Entypo name="cross" size={wp(9)} />
        </View>
      </TouchableOpacity>
    );
  };

  if (playlists.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}> No playlists created yet! </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.createPlaylistButton}>
            <Text style={styles.createPlaylistButtonText}>
              {" "}
              Create a new playlist{" "}
            </Text>
          </View>
        </TouchableOpacity>
        {renderModal()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={playlists}
        extraData={playlists}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.name + toString(index)}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
      >
        <View style={[styles.createPlaylistButton, { marginBottom: wp(5) }]}>
          <Text style={styles.createPlaylistButtonText}>
            {" "}
            Create a new playlist{" "}
          </Text>
        </View>
      </TouchableOpacity>
      {renderModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f1f2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "black",
    fontSize: wp(8),
    fontWeight: "400",
    fontFamily: "Roboto",
  },
  createPlaylistButton: {
    width: wp(60),
    height: hp(7),
    borderRadius: wp(6),
    borderColor: "#3d54dc",
    backgroundColor: "#3d54dc",
    alignItems: "center",
    justifyContent: "center",
    marginTop: wp(7),
  },
  createPlaylistButtonText: {
    color: "white",
    fontSize: wp(5),
    fontWeight: "400",
    fontFamily: "Roboto",
  },
  modal: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f1f2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  modalInput: {
    height: hp(7),
    width: wp(80),
    borderWidth: wp(0.1),
    borderRadius: wp(6),
    borderColor: "black",
    paddingLeft: wp(5),
    fontSize: wp(6),
  },
  playlistButton: {
    flexDirection: "row",
    width: wp(60),
    height: hp(7),
    borderRadius: wp(6),
    borderColor: "#3d54dc",
    backgroundColor: "#3d54dc",
    alignItems: "center",
    justifyContent: "center",
    marginTop: wp(6),
  },
  playlistButtonText: {
    color: "white",
    fontSize: wp(5.5),
    fontWeight: "400",
    fontFamily: "Roboto",
  },
});

export default PlaylistsScreen;
