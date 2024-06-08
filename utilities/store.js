import { createContext } from 'react';
import { tracks } from '../utilities/tracks';

const MusicContext = createContext();

const initialState = {
    tracks: tracks, // list containing music track objects
    /*
    list of playlists in the following format: [{name: playlistName, tracks: [playlistTrackObjects]}]
    name => name of the playlist
    tracks => list containing music track objects
    */
    playlists: []
};

const musicReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "HANDLE_FAVORITE":
            // Handle favorites here, i.e., adding and removing music tracks from favorites
        case "CREATE_PLAYLIST":
            // Create playlists here
        case "DELETE_PLAYLIST":
            // Delete playlists here
        case "ADD_TRACK_TO_PLAYLIST":
            // Add individual music track to a particular playlist here
        case "DELETE_TRACK_FROM_PLAYLIST":
            // Delete individual music track from a particular playlist here
        default:
            window.alert("Error! Something went wrong.")
    }
};

export { MusicContext, initialState, musicReducer };