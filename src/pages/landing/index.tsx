// // landing page
// //The navigation bar should include the application name and provide options for user sign-in and sign-up.
// import { Disclosure } from "@headlessui/react";
// import React from "react";
// import { Link } from "react-router-dom";
// const Landing: React.FC = () => {
//     const navigation = [
//         { name: "Sign in", href: "/signin" },
//         { name: "Sign up", href: "/signup" },
//     ]
//     return (
//         //navigation bar on the top
//         <>
//             <Disclosure as="nav" className="border-b border-slate-200">
//                 {() => (
//                     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 dark:bg-red-500">
//                         <div className="flex h-16 items-center justify-between">
//                             <div className="flex items-center">
//                                 <div className="flex-shrink-0">
//                                     <img
//                                         className="h-12 w-12 sm:h-14 sm:w-14 mr-2"
//                                         src='../../assets/logo.png'
//                                         alt="Sports App"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="hidden md:block">
//                                 <div className="ml-10 flex items-baseline space-x-4">
//                                     {navigation.map((item) => (
//                                         <button
//                                             key={item.name}
//                                             className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
//                                         >
//                                             <Link to={item.href}>{item.name}</Link>
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </Disclosure>

//         </>
//     );
// };

// export default Landing;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useContext } from "react";
import { Disclosure, Switch } from "@headlessui/react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/theme";
import LiveMatch from "../../components/Matches";
import Articles from "../../components/Articles";
// const classNames = (...classes: string[]): string =>
//   classes.filter(Boolean).join(" ");

const Landing = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(theme === "dark");
  // const { pathname } = useLocation();

  const toggleTheme = () => {
    let newTheme = "";
    if (theme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }
    setEnabled(!enabled);
    setTheme(newTheme);
  };

  const auth = !!localStorage.getItem("authToken");
  let navigation = [];
  if(auth){
    navigation = [
      { name: "Profile", href: "/profile", current: false },
      { name: "Sign out", href: "/logout", current: false },
      { name : "Preferences", href: "/account/preferences", current: false}
    ];
  }else{
    navigation = [
      { name: "Sign in", href: "/signin", current: false },
      { name: "Sign up", href: "/signup", current: false },
    ];
  }

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200">
        {() => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 sm:h-14 sm:w-14 mr-2"
                    src="src/assets/logo.png"
                    alt="Sports App"
                  />
                </div>
                <div className="hidden md:block">
                  {/* <div className="ml-10 flex items-baseline space-x-9">
                    {navigation.map((item) => { 
                      const isCurrent = pathname.includes(item.href)

                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isCurrent
                              ? 'bg-slate-50 text-blue-700'
                              : 'text-slate-500 hover:text-blue-600',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={isCurrent ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                    )})}
                  </div> */}


                </div>
              </div>



              <Switch
                checked={enabled}
                onChange={toggleTheme}
                className={`${enabled ? "bg-slate-400" : "bg-slate-700"}
                  relative inline-flex h-[24px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span
                  aria-hidden="true"
                  className={`${enabled ? "translate-x-9" : "translate-x-0"}
                    pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
                    >
                      <Link to={item.href}>{item.name}</Link>
                    </button>
                  ))}


              
                </div>
              </div>
            </div>
            
          </div>

        )}


      </Disclosure>
      <LiveMatch />
      <br />
      <br />
      <Articles />

  
    </>
      );
};

      export default Landing;





