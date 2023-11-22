import React from "react";
import "./HourlyItem.scss";



export const HourlyItem = ({ data }: any) => {
    const weatherCode = `${data.weather.icon}`;
    const unitSymbol = "C"
    return (
        <div className="hourly-item">
            <label className="hour">{new Date(data.dt * 1000).getHours()}:00</label>
            <img
                src={require(`../../resources/icon_${weatherCode}.png`)}
                className="icon-small"
                alt=""
            />
            <label className="temp">
                {Math.round(data.temp)}°{unitSymbol}
            </label>
        </div>
    );
};
export default HourlyItem;
