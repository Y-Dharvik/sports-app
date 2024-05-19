import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import { ThemeContext } from "./context/theme";
import { Suspense, useContext } from "react";

const App = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`mx-auto h-screen flex flex-col px-4py-2 ${theme === "dark" ? "dark" : ""}`}
    >
      
            <Suspense fallback={<>Loading...</>}>
              <RouterProvider router={Router} />
            </Suspense>
          
    </div>
  );
};
export default App;
