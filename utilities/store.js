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
      return {
        ...state,
        playlists: [...state.playlists, payload.data],
      };
    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist.name !== payload.data
        ),
      };
    case "ADD_TRACK_TO_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((playlist) => {
          if (playlist.name === payload.data.playlistName) {
            return {
              ...playlist,
              tracks: [...playlist.tracks, payload.data.track],
            };
          }
          return playlist;
        }),
      };
    case "DELETE_TRACK_FROM_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((playlist) => {
          if (playlist.name === payload.data.playlistName) {
            const updatedTracks = playlist.tracks.filter(
              (track) => track.id !== payload.data.track.id
            );
            return {
              ...playlist,
              tracks: updatedTracks,
            };
          }
          return playlist;
        }),
      };
    default:
      window.alert("Error! Something went wrong.");
  }
};

export { MusicContext, initialState, musicReducer };
