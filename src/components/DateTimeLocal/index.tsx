import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const DateTimeLocal = () => {
    const { i18n } = useTranslation();
    const dFormatter = new Intl.DateTimeFormat(i18n.language, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
        
    const tFormatter = new Intl.DateTimeFormat(i18n.language, {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
    const [currTime, setCurrTime] = useState(tFormatter.format(new Date()));
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrTime(tFormatter.format(new Date()));
        }, 1000);
        return () => clearInterval(interval);
    }, [currTime, i18n.language]);

  return (
    // dynamically update the time and date. The clock should be ticking every second
    <div className="flex flex-col">
      <div className="font-bold text-gray-700 px-2">
        {dFormatter.format(new Date())}
      </div>
      <div className="font-semibold text-gray-700 px-2">
        {currTime}
      </div>
    </div>
  );
};

export default DateTimeLocal;