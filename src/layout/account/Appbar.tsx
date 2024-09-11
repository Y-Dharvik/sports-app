/* eslint-disable @typescript-eslint/no-unused-vars */
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import LiveMatch from "../../components/Matches";
import Articles from "../../components/Articles";
import { usePreferencesDispatch } from "../../context/preferences/context";
import {  setPreferences } from "../../context/preferences/action";
import { initialPreferencesState } from "../../context/preferences/types";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const Appbar = () => {
  const {t, i18n} = useTranslation();
  const [currLang, setCurrLang] = useState(() => i18n.language);
  useEffect(() => {
    i18n.changeLanguage(currLang);
  }, [currLang, i18n]);
  const auth = !!localStorage.getItem("authToken");
  const data = JSON.parse(localStorage.getItem("userData") || "{}");
  let navigation = [];
  if(auth){
    navigation = [
      { name: t("Profile"), href: "/account/profile", current: false },
      { name: t("Sign out"), href: "/logout", current: false },
      { name : t("Preferences"), href: "/account/preferences", current: false}
    ];
  }else{
    navigation = [
      { name: "Sign in", href: "/signin", current: false },
      { name: "Sign up", href: "/signup", current: false },
    ];
  }

  if (data.preferences.selectedSports && data.preferences.selectedTeams) {
    const preferencesDispatch = usePreferencesDispatch();
    setPreferences(preferencesDispatch, data.preferences);
  }else{
    const preferencesDispatch = usePreferencesDispatch();
    const userPreferences = initialPreferencesState.preferences;
    setPreferences(preferencesDispatch, userPreferences);
  }

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200" data-testid="auth-page">
        {() => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 sm:h-14 sm:w-14 mr-2"
                    src="/assets/logo.avif"
                    alt="SportSpot"
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

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      data-testid={item.name + "-button"}
                      className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
                    >
                      <Link to={item.href}>{item.name}</Link>
                    </button>
                  ))}
                  <select
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
                    onChange={(e) => setCurrLang(e.target.value)}
                    value={currLang}
                  >
                    <option value="en">EN</option>
                    <option value="de">DE</option>
                  </select>
                  
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

      export default Appbar;
