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
  sunrise?: any;
  sunset?: any;
}

export function Dashboard(props: Dashboard) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [localTime, setLocalTime] = useState<string>("");
  const [isDaytime, setIsDaytime] = useState<boolean>(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsLoading(true);
      const currentTime = moment()
        .utcOffset(props.timezone / 60)
        .format("YYYY-MM-DD h:mm:ss A");
      setLocalTime(currentTime);

      const now = moment().utcOffset(props.timezone / 60);
      const secondsSince = now.unix();
      if (props.sunrise && props.sunset) {
        setIsDaytime(
          secondsSince >= props.sunrise && secondsSince <= props.sunset
        );
      }
    }, 1000);
    setIsLoading(false);
    return () => clearInterval(intervalId);
  }, [props.timezone]);

  return (
    <>
      {isLoading && (
        <div className="weather-dashboard">
          <div className="location">
            {props.name}, {props.country}
            <div className="img-wrapper">
              {isDaytime ? (
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
