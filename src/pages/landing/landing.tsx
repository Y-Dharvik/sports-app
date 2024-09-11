/* eslint-disable @typescript-eslint/no-unused-vars */
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import LiveMatch from "../../components/Matches";
import Articles from "../../components/Articles";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useEffect } from "react";


const Landing = () => {
  const {t, i18n} = useTranslation();
  const [currLang, setCurrLang] = useState(() => i18n.language);
  useEffect(() => {
    i18n.changeLanguage(currLang);
  }, [currLang, i18n]);
  let navigation = [
    { name: t("Sign in"), href: "/signin", current: false },
    { name: t("Sign up"), href: "/signup", current: false },
  ];

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
                    src="/assets/logo.avif"
                    alt="Sports App"
                  />
                </div>
                <div className="hidden md:block"></div>
              </div>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
                    >
                      <Link to={item.href} data-testid={item.name.toLowerCase().replace(" ", "") + "-button"}>{item.name}</Link>
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

export default Landing;
