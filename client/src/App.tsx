import React from "react";
import { Provider } from "react-redux";
import store from "./store/store"; // Import the Redux store
import SongForm from "./components/SongForm"; // Import the SongForm component
import SongList from "./components/SongList";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Music App</h1>
        <SongForm />
        <SongList />
        {/* Here, you can also add a list of songs and buttons for update/delete functionalities */}
      </div>
    </Provider>
  );
};

export default App;
