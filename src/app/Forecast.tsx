"use client";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

const forcastMonths = [
  {
    name: "December",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl: "/resources/icon_01d.png",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "January",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl: "/resources/icon_02d.png",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "February",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl: "/resources/icon_03n.png",
    href: "#",
    lastSeen: null,
  },
  {
    name: "March",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl: "/resources/icon_03d.png",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "April",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl: "/resources/icon_01n.png",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "May",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl: "/resources/icon_02n.png",
    href: "#",
    lastSeen: null,
  },
];

export default function Forecast() {
  const [forecast, setForecast] = useState([] as any[]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("auth-key", "4rKtCc6YvWnsS8EPzCEb9SuS3xEzp5KM");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      lat: 5.65178,
      lon: 5,
    });

    var requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/forecast", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setForecast(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {forcastMonths.map((person) => (
        <li
          key={person.name}
          className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
        >
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-12 w-12 flex-none rounded-full bg-gray-50"
              src={person.imageUrl}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <a href={person.href}>
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {person.name}
                </a>
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                <a
                  href={`mailto:${person.email}`}
                  className="relative truncate hover:underline"
                >
                  {person.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
            <div className="flex -space-x-0.5">
              {[0, 1, 2, 3, 5, 4].map((commenter) => (
                <dd key={commenter}>
                  <img
                    className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                    src={"/resources/icon_01d.png"}
                    alt={commenter.toString()}
                  />
                </dd>
              ))}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen{" "}
                  <time dateTime={person.lastSeenDateTime}>
                    {person.lastSeen}
                  </time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
            <ChevronRightIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
