import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";
import store from "./store/store";
import Statistics from "./components/Statistics";
import theme from "./theme";
import Header from "./components/Header";
import Songs from "./pages/Songs";
import Footer from "./components/Footer";

// Styled components using Emotion's `styled`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures the container takes at least the full height of the viewport */
  background-color: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1; /* Allows the main content area to grow and push the footer to the bottom */
  padding: ${({ theme }) => theme.spacing.large};
  padding-top: 0; /* Adjusts padding for the content area */
`;

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Container>
            <Header />
            <Main>
              <Routes>
                <Route path="/" element={<Songs />} />
                <Route path="/statistics" element={<Statistics />} />
              </Routes>
            </Main>
            <Footer />
          </Container>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux";
// import { ThemeProvider } from "@emotion/react";
// import store from "./store/store";
// import Statistics from "./components/Statistics";
// import theme from "./theme";
// import Header from "./components/Header";
// import Songs from "./pages/Songs";
// import Footer from "./components/Footer";

// /** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";

// const App = () => {
//   return (
//     <Provider store={store}>
//       <ThemeProvider theme={theme}>
//         <Router>
//           <div
//             css={css`
//               display: flex;
//               flex-direction: column;
//               min-height: 100vh; /* Ensures the container takes at least the full height of the viewport */
//               background-color: ${theme.colors.background};
//             `}
//           >
//             <Header />
//             <main
//               css={css`
//                 flex: 1; /* Allows the main content area to grow and push the footer to the bottom */
//                 padding: ${theme.spacing.large};
//                 padding-top: 0;
//               `}
//             >
//               <Routes>
//                 <Route path="/" element={<Songs />} />
//                 <Route path="/statistics" element={<Statistics />} />
//               </Routes>
//             </main>
//             <Footer />
//           </div>
//         </Router>
//       </ThemeProvider>
//     </Provider>
//   );
// };

// export default App;
