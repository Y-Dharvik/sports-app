import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import { Suspense } from "react";
import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";
import { PreferencesProvider } from "./context/preferences/context";
import { SportProvider } from "./context/sports/context";
import { TeamsProvider } from "./context/teams/context";

const App = () => {
  return (
    <div
      className={`mx-auto h-screen flex flex-col px-4py-2 `}
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
