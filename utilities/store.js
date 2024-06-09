import { createContext } from "react";
import { tracks } from "../utilities/tracks";

const MusicContext = createContext();

const initialState = {
  tracks: tracks, // list containing music track objects
  /*
    list of playlists in the following format: [{name: playlistName, tracks: [playlistTrackObjects]}]
    name => name of the playlist
    tracks => list containing music track objects
    */
  playlists: [],
};

const musicReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "HANDLE_FAVORITE":
      const updatedTracks = state.tracks.map((track) => {
        if (track.id === payload.data.id) {
          return {
            ...track,
            favorite: !track.favorite,
          };
        } else {
          return track;
        }
      });
      return {
        ...state,
        tracks: updatedTracks,
      };
    case "CREATE_PLAYLIST":
    // Create playlists here
    case "DELETE_PLAYLIST":
    // Delete playlists here
    case "ADD_TRACK_TO_PLAYLIST":
    // Add individual music track to a particular playlist here
    case "DELETE_TRACK_FROM_PLAYLIST":
    // Delete individual music track from a particular playlist here
    default:
      window.alert("Error! Something went wrong.");
  }
};

export { MusicContext, initialState, musicReducer };
