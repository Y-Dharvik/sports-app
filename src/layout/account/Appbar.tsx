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
import DateTimeLocal from "../../components/DateTimeLocal";

const Appbar = () => {
  const {t, i18n} = useTranslation();
  const [currLang, setCurrLang] = useState(() => i18n.language);
  useEffect(() => {
    i18n.changeLanguage(currLang);
  }, [currLang]);
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
      <h1 className="text-gray-900 font-bold mb-2 mt-4 ml-2 text-2xl">{t("Date & Time")}</h1>
      <DateTimeLocal />
      <LiveMatch />
      <br />
      <br />
      <Articles />

  
    </>
      );
};

      export default Appbar;
