import React, { FC } from "react";

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
}

export function Dashboard(props: Dashboard) {
  return (
    <>
      <div className="current">
        <h2 className="cityName">{props.name}</h2>
        <img
          className="weatherIcon"
          alt="weather-icon"
          src={`http://openweathermap.org/img/wn/` + props.icon + `@2x.png`}
        />
        <p className="description">{props.description}</p>
        <p>
          Temp: {props.tempC} &#8451; {props.tempF} &#8457;
        </p>
        <p>
          Feels Like: {props.feelsC} &#8451; {props.feelsF} &#8457;
        </p>
        <p>
          Min: {props.feelsC} &#8451; {props.feelsF} &#8457;
        </p>
        <p>
          Max: {props.maxC} &#8451; {props.maxF} &#8457;
        </p>
      </div>
    </>
  );
}
