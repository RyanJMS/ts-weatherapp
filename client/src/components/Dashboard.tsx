import React, { useEffect, useState, FC } from "react";
import "../index.css";
import moment from "moment-timezone";

import moon from "../assets/moon-svgrepo-com.svg";
import sun from "../assets/sun-svgrepo-com.svg";

interface Dashboard {
  tempC?: number;
  tempF?: number;
  feelsC?: number;
  feelsF?: number;
  minC?: number;
  minF?: number;
  maxC?: number;
  maxF?: number;
  name?: string;
  description?: string;
  icon?: string;
  getWeather: Function;
  handleChange: Function;
  country?: string;
  timezone?: any;
}

export function Dashboard(props: Dashboard) {
  const [showDiv, setShowDiv] = useState(false);
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const localTime = moment()
        .utcOffset(props.timezone / 60)
        .format("YYYY-MM-DD h:mm:ss A"); // Create a Moment.js object for the current time in the specified timezone
      setLocalTime(localTime);
    }, 1000); // Update the local time every second

    return () => clearInterval(intervalId); // Clean up the interval when the component unmounts
  }, [props.timezone]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDiv(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {showDiv && (
        <div className="weather-dashboard">
          <div className="location">
            {props.name}, {props.country}
            <div className="img-wrapper">
              {props ? (
                <img className="sun" src={sun} />
              ) : (
                <img className="moon" src={moon} />
              )}
            </div>
            <div className="time">{localTime}</div>
          </div>
          <div className="temperature">
            {props.tempC}&#8451; {props.tempF}&#8457;
          </div>
          <div className="conditions">
            <img
              className="conditions"
              alt="weather-icon"
              src={`http://openweathermap.org/img/wn/` + props.icon + `@2x.png`}
            />
            <div className="conditions-text">{props.description}</div>
          </div>
        </div>
      )}
    </>
  );
}
