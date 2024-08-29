import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import store from "./store/store";
import Statistics from "./components/Statistics";
import theme from "./theme";
import Header from "./components/Header";
import Songs from "./pages/songs";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div
            style={{
              padding: theme.spacing.large,
              backgroundColor: theme.colors.background,
            }}
          >
            <Header />
            <Routes>
              <Route path="/" element={<Songs />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </div>
        </Router>

        {/* <div
          style={{
            padding: theme.spacing.large,
            backgroundColor: theme.colors.background,
          }}
        >
          <h1 style={{ color: theme.colors.primary }}>Music App</h1>
          <SongForm />
          <SongList />
          <Statistics />
        </div> */}
      </ThemeProvider>
    </Provider>
  );
};

export default App;
