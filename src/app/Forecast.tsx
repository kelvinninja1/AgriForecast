"use client";
import {
  ChevronRightIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import axios from "axios";

const crops = [
  {
    name: "Maize",
    backImage: "/crops/maize.png",
    needs: {
      temperature: {
        min: 20,
        max: 30,
      },
      rainfall: {
        min: 400,
        max: 800,
      },
    },
  },
  {
    name: "Cabbage",
    backImage: "/crops/cabbage.png",
    needs: {
      temperature: {
        min: 15,
        max: 20,
      },
      rainfall: {
        min: 450,
        max: 600,
      },
    },
  },
  {
    name: "Carrot",
    backImage: "/crops/carrot.png",
    needs: {
      temperature: {
        min: 16,
        max: 21,
      },
      rainfall: {
        min: 400,
        max: 600,
      },
    },
  },
];

function getForecastCrops(forcastMonth: any) {
  // based on: forcastMonth.rainfall, forcastMonth.rainfall_ano, forcastMonth.rainfall_mean, forcastMonth.temperature_mean select suitable crops
  return crops
    .filter(
      (crop) =>
        (crop.needs.temperature.min < forcastMonth.temperature_mean &&
          crop.needs.temperature.max > forcastMonth.temperature_mean) ||
        (crop.needs.rainfall.min / 2 < forcastMonth.rainfall &&
          crop.needs.rainfall.max > forcastMonth.rainfall),
    )
    .map((crop) => crop.name)
    .join(", ");
}

function getForecastIllustration(forcastMonth: any) {
  // based on: forcastMonth.rainfall, forcastMonth.rainfall_ano, forcastMonth.rainfall_mean, forcastMonth.temperature_mean select suitable crops
  if (forcastMonth.rainfall > 300) {
    return "/resources/icon_13d.png";
  } else if (forcastMonth.rainfall > 250) {
    return "/resources/icon_11d.png";
  } else if (forcastMonth.rainfall > 200) {
    return "/resources/icon_09d.png";
  } else if (forcastMonth.rainfall > 150) {
    return "/resources/icon_04d.png";
  } else if (forcastMonth.rainfall > 100) {
    return "/resources/icon_03d.png";
  } else if (forcastMonth.rainfall > 50) {
    return "/resources/icon_02d.png";
  } else {
    return "/resources/icon_01d.png";
  }
}

export default function Forecast() {
  const [forecast, setForecast] = useState([] as any);
  const [selectedCrop, setSelectedCrop] = useState("");

  useEffect(() => {
    axios
      .get("/forecast?lat=5.65178&lon=5")
      .then((res) => {
        console.log("Response: ", res);
        const data = JSON.parse(res?.data?.stdout || "{}");
        console.log("Data: ", data);
        setForecast(data);
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        console.log("Finally");
      });
  }, []);

  return (
    <>
      <div className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <a
                className="text-3xl font-bold tracking-tightcsm:text-4xl"
                href="/"
              >
                Agri Forecast ✨
              </a>
              <p className="mt-4 text-lg leading-8">
                Get monthly forecast for your farm ahead of time
              </p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3 lg:grid-cols-3 border-2 p-4 border-amber-400">
              {crops.map((crop, index) => (
                <>
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedCrop(crop.name);
                    }}
                    className="flex flex-col bg-white/5 p-8 relative isolate py-20 z-0 group border-gray-700"
                  >
                    <img
                      src={crop.backImage}
                      alt=""
                      className="absolute inset-0 -z-10 h-full w-full object-contain"
                    />
                    <div className="text-sm font-semibold leading-6 text-gray-700 invisible group-hover:visible opacity-100 transition-opacity duration-300 group-hover:backdrop-blur-3xl">
                      Show only months suitable for {crop.name}
                    </div>
                  </button>
                  <div className="order-first text-md lg:text-2xl font-semibold tracking-tight text-white backdrop-blur-sm">
                    <div className="text-gray-900 hover:text-gray-500">
                      {crop.name}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
        {forecast?.monthly
          ?.filter((forcastMonth: any) =>
            getForecastCrops(forcastMonth).includes(selectedCrop),
          )
          .map((forcastMonth: any) => (
            <li
              key={forcastMonth.id}
              className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
              onClick={() => {
                console.log("Clicked: ", forcastMonth);
                alert(
                  "CropProphect (AI Assistant) is coming soon! 🚀 as a subscription service",
                );
              }}
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={getForecastIllustration(forcastMonth)}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <button>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {forcastMonth.month_start} - {forcastMonth.month_end}
                    </button>
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    <span className="relative truncate hover:underline">
                      {getForecastCrops(forcastMonth)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Rainfall of {forcastMonth.rainfall}
                    mm, showing an anomaly of {forcastMonth.rainfall_ano} mm
                  </p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">
                      {forcastMonth.temperature_mean} °C
                    </p>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Discuss with CropProphect (AI Assistant)
                  </p>
                </div>
                <ChevronRightIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
