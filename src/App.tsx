import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import { ThemeContext } from "./context/theme";
import { Suspense, useContext } from "react";
import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";
import { PreferencesProvider } from "./context/preferences/context";
import { SportProvider } from "./context/sports/context";
import { TeamsProvider } from "./context/teams/context";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`mx-auto h-screen flex flex-col px-4py-2 ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <Suspense fallback={<>Loading...</>}>
        <TeamsProvider>
          <SportProvider>
            <PreferencesProvider>
              <MatchesProvider>
                <ArticlesProvider>
                  <RouterProvider router={Router} />
                </ArticlesProvider>
              </MatchesProvider>
            </PreferencesProvider>
          </SportProvider>
        </TeamsProvider>
      </Suspense>
    </div>
  );
};
export default App;
