import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
// import Notfound from "../pages/Notfound";


import Notfound from "../pages/Notfound";

import ArticleId from "../components/Articles/Article";
import MatchId from "../components/Matches/Match";
const Signin = React.lazy(() => import("../pages/signin"));
const Signup = React.lazy(() => import("../pages/signup"));
const AccountLayout = React.lazy(() => import("../layout/account"));
// const Projects = React.lazy(() => import("../pages/projects"));
// const Members = React.lazy(() => import("../pages/members"));
const Logout = React.lazy(() => import("../pages/logout"));
// const ProjectDetails = React.lazy(() => import("../pages/project_details"));
// const NewTask = React.lazy(() => import("../pages/tasks/NewTask"));
// const TaskDetailsContainer = React.lazy(
//   () => import("../pages/tasks/TaskDetailsContainer")
// );


let authenticated = !!localStorage.getItem("authToken");
const checkAuth = () => {
  authenticated = !!localStorage.getItem("authToken");
  if (authenticated) {
    return <Navigate to="/account" replace />;    
    
  }else{
    return <Navigate to="/signin" replace />;
  }
}


const router = createBrowserRouter([
  { 
    path: "/", 
    element: checkAuth(),
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  // Protected Routes
  {
    path: "/account",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
    ErrorBoundary: () => <>Failed to load the page</>,
    children: [
      {
        path: "articles/:articleId",
        element: <ArticleId />
      }, 
      {
        path: "matches/:matchId",
        element: <MatchId />
      }

    ],
    
  },
//       {
//         path: "members",
//         element: (<Members />)
//       },
//     ],
//   },
  {
    path: "/notfound",
    element: <Notfound />
  },
  {
    path: "*",
    element: <Navigate to="/notfound" replace />
  }
]);

export default router;
