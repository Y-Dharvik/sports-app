import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import { ThemeContext } from "./context/theme";
import { Suspense, useContext } from "react";
import { MatchesProvider } from "./context/matches/context";
import { ArticlesProvider } from "./context/articles/context";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`mx-auto h-screen flex flex-col px-4py-2 ${theme === "dark" ? "dark" : ""}`}
    >
      
            <Suspense fallback={<>Loading...</>}>
              <MatchesProvider>
              <ArticlesProvider>
              <RouterProvider router={Router} />
              </ArticlesProvider>
              </MatchesProvider>
            </Suspense>
          
    </div>
  );
};
export default App;
