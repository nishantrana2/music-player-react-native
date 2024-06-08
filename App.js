import React, { useReducer } from "react";
import { MusicContext, initialState, musicReducer } from "./utilities/store";
import StackNavigator from "./components/StackNavigator";

const App = () => {
  const [state, dispatch] = useReducer(musicReducer, initialState);

  return (
    <MusicContext.Provider value={{ state: state, dispatchFunction: dispatch }}>
      <StackNavigator />
    </MusicContext.Provider>
  );
};

export default App;
