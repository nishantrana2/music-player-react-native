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

/*
  navigation => navigation prop from the stack navigator to navigate to various screens
  screenType => from which screen the navigation was done, i.e., tracks, favorites, or playlists
  playlistName => this prop will exist if the navigation was done from the playlists screen. It specifies the name of the playlist whose music tracks are to be displayed
*/
const DisplayTracks = ({ navigation, screenType, playlistName }) => {
  /* DO NOT EDIT BELOW THIS LINE */

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

  /* DO NOT EDIT ABOVE THIS LINE */

  useEffect(() => {
    if (screenType === "tracks") {
      setTracksState(storeData.state.tracks);
    } else if (screenType === "favorites") {
      setTracksState(storeData.state.tracks.filter((track) => track.favorite));
    } else if (screenType === "playlists") {
      const playlist = storeData.state.playlists.find(
        (playlist) => playlist.name === playlistName
      );
      const updatedTracks = playlist.tracks.map((track) => {
        const correspondingTrack = storeData.state.tracks.find(
          (storeTrack) => storeTrack.id === track.id
        );
        if (correspondingTrack) {
          return correspondingTrack;
        }
        return track;
      });
      setTracksState(updatedTracks);
    }
  }, []);

  const searchLogic = (text) => {
    text = text.toLowerCase();
    var tracks = [];
    if (screenType === "tracks") tracks = storeData.state.tracks;
    else if (screenType === "favorites")
      tracks = storeData.state.tracks.filter((track) => track.favorite);
    else if (screenType === "playlists") {
      const playlist = storeData.state.playlists.find(
        (playlist) => playlist.name === playlistName
      );
      const updatedTracks = playlist.tracks.map((track) => {
        const correspondingTrack = storeData.state.tracks.find(
          (storeTrack) => storeTrack.id === track.id
        );
        if (correspondingTrack) {
          return correspondingTrack;
        }
        return track;
      });
      tracks = updatedTracks;
    }
    if (text === "") {
      setTracksState(tracks);
    } else {
      let filteredTracks = tracks.filter((track) =>
        track.name.toLowerCase().includes(text)
      );
      setTracksState(filteredTracks);
    }
  };

  const play = async (item) => {
    const track = new Audio.Sound();
    await track.loadAsync(item.path, {
      onError: (error) => {
        window.alert("Error loading track!");
        return;
      },
    });
    const status = await track.getStatusAsync();
    const durationSeconds = Math.floor(status.durationMillis / 1000);
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;
    setDuration({ minutes: minutes, seconds: seconds });
    setProgress(0);
    await track.playAsync({
      onError: (error) => {
        window.alert("Error playing track!");
        return;
      },
    });
    setIsPlaying(true);
    setCurrentTrack(track);
    try {
      track.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isPlaying) {
          const durationSecondsLeft = Math.floor(
            (status.durationMillis - status.positionMillis) / 1000
          );
          const minutesLeft = Math.floor(durationSecondsLeft / 60);
          const secondsLeft = durationSecondsLeft % 60;
          setDuration({ minutes: minutesLeft, seconds: secondsLeft });
          const trackDurationSeconds = Math.floor(status.durationMillis / 1000);
          const trackPositionSeconds = Math.floor(status.positionMillis / 1000);
          const trackProgress = trackPositionSeconds / trackDurationSeconds;
          setProgress(trackProgress);
        }
        if (status.didJustFinish) {
          await track.unloadAsync();
          setIsPlaying(false);
          setSelectedItemId(null);
          setCurrentTrack(null);
          setProgress(0);
          setDuration(null);
          setNowPlaying("");
        }
      });
    } catch (error) {
      window.alert("Error while playing track!");
      await track.unloadAsync();
      setIsPlaying(false);
      setSelectedItemId(null);
      setCurrentTrack(null);
      setProgress(0);
      setDuration(null);
      setNowPlaying("");
      return;
    }
  };

  const pause = async () => {
    try {
      const playbackStatus = await currentTrack.getStatusAsync();
      if (playbackStatus.isLoaded) {
        await currentTrack.pauseAsync();
      }
      setIsPlaying(false);
    } catch (err) {
      window.alert("Error pausing track!");
      return;
    }
  };

  const resume = async () => {
    if (currentTrack === null) {
      window.alert("Please select a track to play!");
      return;
    }
    try {
      const playbackStatus = await currentTrack.getStatusAsync();
      if (playbackStatus.isLoaded) {
        await currentTrack.playAsync();
      }
      setIsPlaying(true);
    } catch (err) {
      window.alert("Error resuming track!");
      return;
    }
  };

  const handlePlayTrack = async (item) => {
    try {
      if (currentTrack === null) {
        play(item);
      } else {
        if (item.id === selectedItemId) {
          if (isPlaying) pause();
          else resume();
        } else {
          await currentTrack.unloadAsync();
          setCurrentTrack(null);
          play(item);
        }
      }
    } catch (error) {
      window.alert("Some error occured. Please try again later!");
    }
  };

  const handleForwardBackward = (type) => {
    if (currentTrack === null) {
      window.alert("Please select a track to play!");
      return;
    }
    const currentTrackIndex = tracksState.findIndex(
      (track) => track.id === selectedItemId
    );
    let updatedTrackIndex;
    if (type == "forward")
      updatedTrackIndex = (currentTrackIndex + 1) % tracksState.length;
    else
      updatedTrackIndex =
        (currentTrackIndex - 1 + tracksState.length) % tracksState.length;
    setSelectedItemId(tracksState[updatedTrackIndex].id);
    setNowPlaying(
      "Now playing: " +
        tracksState[updatedTrackIndex].name +
        " by " +
        tracksState[updatedTrackIndex].performer
    );
    handlePlayTrack(tracksState[updatedTrackIndex]);
  };

  const handleFavorite = async (item) => {
    await storeData.dispatchFunction({
      type: "HANDLE_FAVORITE",
      payload: {
        data: item,
      },
    });
    if (screenType === "favorites") {
      setTracksState((prevTracksState) =>
        prevTracksState
          .map((track) =>
            track.id === item.id
              ? { ...track, favorite: !track.favorite }
              : track
          )
          .filter((track) => track.favorite)
      );

      if (!item.favorite === false) {
        await currentTrack.unloadAsync();
        setDuration(null);
        setIsPlaying(false);
        setSelectedItemId(null);
        setCurrentTrack(null);
        setProgress(0);
        setNowPlaying("");
      }
    } else {
      console.log(tracksState, "first");
      setTracksState((prevTracksState) =>
        prevTracksState.map((track) =>
          track.id === item.id ? { ...track, favorite: !track.favorite } : track
        )
      );
    }
  };

  console.log(tracksState, "after all");

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedItemId;
    const handleSelectedItem = () => {
      if (!isSelected) {
        setSelectedItemId(item.id);
        setNowPlaying("Now playing: " + item.name + " by " + item.performer);
      }
      handlePlayTrack(item);
    };
    return (
      <TouchableWithoutFeedback onPress={() => handleSelectedItem()}>
        <View style={styles.box}>
          <Image source={item.icon} style={styles.icon} />
          <View>
            <Text style={styles.trackName}> {item.name} </Text>
            <Text style={styles.trackPerformer}> By {item.performer} </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity activeOpacity={0.7}>
                <View style={styles.createPlaylistButton}>
                  <Text style={styles.createPlaylistButtonText}>
                    {screenType === "playlists"
                      ? "Remove from playlist"
                      : "Add to playlist"}
                  </Text>
                </View>
              </TouchableOpacity>
              {item.favorite ? (
                <AntDesign
                  name="heart"
                  color="red"
                  onPress={() => handleFavorite(item)}
                  size={wp(10)}
                  style={styles.heart}
                />
              ) : (
                <AntDesign
                  name="hearto"
                  onPress={() => handleFavorite(item)}
                  size={wp(10)}
                  style={styles.heart}
                />
              )}
              {isSelected ? (
                <MaterialCommunityIcons
                  name="waveform"
                  size={wp(12)}
                  style={styles.waveformIcon}
                />
              ) : null}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderPlayPause = () => {
    return isPlaying ? (
      <AntDesign
        name="pause"
        onPress={() => pause()}
        size={wp(10)}
        style={styles.playPause}
      />
    ) : (
      <Entypo
        name="controller-play"
        onPress={() => resume()}
        size={wp(10)}
        style={styles.playPause}
      />
    );
  };

  if (tracksState.length === 0 && screenType === "favorites") {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text style={styles.emptyText}> No tracks marked as favorite! </Text>
      </SafeAreaView>
    );
  } else if (tracksState.length === 0 && screenType === "playlists") {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text style={styles.emptyText}> No tracks in this playlist! </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <TextInput
          style={styles.searchbar}
          keyboardType="default"
          placeholder="Search tracks"
          placeholderTextColor="black"
          onChangeText={(text) => searchLogic(text)}
        />
      </View>
      <View style={styles.view2}>
        <FlatList
          data={tracksState}
          extraData={tracksState}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.view3}>
        <Text style={styles.nowPlaying}> {nowPlaying} </Text>
        <Progress.Bar
          progress={progress}
          width={wp(80)}
          height={wp(5)}
          color="black"
          unfilledColor="#f1f2ff"
          style={styles.bar}
        />
        <View style={styles.controlsWrapper}>
          <AntDesign
            name="banckward"
            onPress={() => handleForwardBackward("backward")}
            size={wp(7)}
            style={styles.backward}
          />
          {renderPlayPause()}
          <AntDesign
            name="forward"
            onPress={() => handleForwardBackward("forward")}
            size={wp(7)}
            style={styles.forward}
          />
          {duration !== null &&
            !isNaN(duration.minutes) &&
            !isNaN(duration.seconds) && (
              <Text style={styles.duration}>
                {duration.minutes.toString().padStart(2, "0")} :{" "}
                {duration.seconds.toString().padStart(2, "0")}
              </Text>
            )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f1f2ff",
  },
  view1: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchbar: {
    backgroundColor: "#FFFFFF",
    height: hp(5.5),
    width: wp(70),
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "black",
    fontSize: 25,
    fontWeight: "400",
    fontFamily: "Roboto",
    paddingLeft: 20,
    marginTop: wp(5),
  },
  view2: {
    flex: 9,
    alignItems: "center",
    justifyContent: "center",
    marginTop: wp(2),
  },
  box: {
    flexDirection: "row",
    height: hp(17),
    width: wp(96),
    borderTopWidth: wp(0.3),
    borderBottomWidth: wp(0.3),
    borderLeftWidth: wp(0.3),
    borderRightWidth: wp(0.3),
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: wp(5),
  },
  icon: {
    height: wp(25),
    width: wp(25),
  },
  trackName: {
    color: "black",
    fontSize: wp(5),
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  trackPerformer: {
    color: "black",
    fontSize: wp(5),
    fontWeight: "400",
    fontFamily: "Roboto",
    fontStyle: "italic",
  },
  createPlaylistButton: {
    width: wp(35),
    height: hp(4.5),
    borderRadius: wp(5),
    borderColor: "#3d54dc",
    backgroundColor: "#3d54dc",
    borderWidth: wp(1),
    alignItems: "center",
    justifyContent: "center",
    marginTop: wp(3),
  },
  createPlaylistButtonText: {
    color: "white",
    fontSize: wp(3.5),
    fontWeight: "400",
    fontFamily: "Roboto",
  },
  heart: {
    marginTop: wp(2.3),
    marginLeft: wp(3),
  },
  waveformIcon: {
    marginTop: wp(1.5),
    marginLeft: wp(3),
  },
  view3: {
    flex: 1.8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  nowPlaying: {
    color: "black",
    fontSize: wp(3.6),
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontStyle: "italic",
    marginTop: wp(2.6),
  },
  bar: {
    marginTop: wp(1),
  },
  controlsWrapper: {
    flexDirection: "row",
    width: wp(100),
    paddingLeft: wp(33),
  },
  backward: {
    paddingTop: wp(2.5),
  },
  playPause: {
    paddingTop: wp(1),
    marginLeft: wp(3),
    marginRight: wp(2.7),
  },
  forward: {
    paddingTop: wp(2.5),
  },
  emptyText: {
    color: "black",
    fontSize: wp(6),
    fontWeight: "400",
    fontFamily: "Roboto",
  },
  duration: {
    color: "black",
    fontSize: wp(4.5),
    fontWeight: "400",
    fontFamily: "Roboto",
    paddingLeft: wp(13.5),
    paddingTop: wp(1),
  },
});

export default DisplayTracks;
