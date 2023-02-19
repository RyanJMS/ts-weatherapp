import React, { useEffect, useState, FC } from "react";
import "../index.css";
import moment from "moment";

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
  const [currentTime, setCurrentTime] = useState("");
  const [showDiv, setShowDiv] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentMoment = moment();
      const currentMomentFormatted = currentMoment.format(
        "YYYY-MM-DD h:mm:ss A"
      );
      setCurrentTime(currentMomentFormatted);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

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
            <div className="time">{currentTime}</div>
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
