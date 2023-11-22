import { JSX, SVGProps } from "react";

const crops = [
  {
    name: "Maize",
    backImage: "/crops/maize.png",
  },
  {
    name: "Cabbage",
    backImage: "/crops/cabbage.png",
  },
  {
    name: "Carrot",
    backImage: "/crops/carrot.png",
  },
];

export default function CropsFilter() {
  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tightcsm:text-4xl">
              Stay In Tune with Lordina 🎶✨
            </h2>
            <p className="mt-4 text-lg leading-8">
              News Updates, Notices, Press Releases, Projects, and Programmes.
              Follow and subscribe to our social media channels for exclusive
              content and behind-the-scenes insights!
            </p>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3 lg:grid-cols-3 border-2 p-4 border-amber-400">
            {crops.map((channel, index) => (
              <button
                key={index}
                className="flex flex-col bg-white/5 p-8 relative isolate py-20 z-0 group border-gray-700 "
              >
                <img
                  src={channel.backImage}
                  alt=""
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="text-sm font-semibold leading-6 text-gray-700 invisible group-hover:visible opacity-100 transition-opacity duration-300">
                  Show only months suitable for {channel.name}
                </div>
                <div className="order-first text-3xl font-semibold tracking-tight text-white">
                  <div className="text-gray-900 hover:text-gray-500">
                    {channel.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
