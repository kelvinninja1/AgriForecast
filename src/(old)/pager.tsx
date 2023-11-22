import Image from 'next/image'
import "./App.scss";
import React, { useEffect, useState } from "react";

import Daily from "../Daily/Daily";
import Header from "../Header/Header";
import Hourly from "./Hourly";
import "./Container.scss";


export default function Homer() {

  return (
      <main className="light">
        <div className="main-container">
            <div className="container">
                    <div className="grid-container">
                        <Header

                        ></Header>
                        {/*<CurrentWeather*/}
                        {/*    data={currentWeatherSelectedItem}*/}
                        {/*></CurrentWeather>*/}
                        {/*<CurrentWeatherDetails*/}
                        {/*    data={currentWeatherSelectedItem.details}*/}
                        {/*></CurrentWeatherDetails>*/}
                        <Hourly
                            data={hourlyWeather}
                            clickHandler={hourlyItemClickHandler}
                        ></Hourly>
                        <Daily data={dailyWeather}></Daily>
                    </div>
            </div>
        </div>
      </main>
  )
}
