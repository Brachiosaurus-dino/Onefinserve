import { useRef } from "react";

const niftyData = [
  { name: "NIFTY 50", value: "18,200", change: "+1.2%" },
  { name: "NIFTY Bank", value: "41,500", change: "+0.8%" },
  { name: "NIFTY IT", value: "33,400", change: "-0.5%" },
  { name: "NIFTY FMCG", value: "38,200", change: "+0.3%" },
  { name: "NIFTY Auto", value: "12,500", change: "+0.7%" },
];

export default function NiftyCarousel() {
  const items = [...niftyData, ...niftyData];
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden w-full bg-zinc-900 py-4 px-10">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 pl-2 -translate-y-1/2 text-3xl text-white z-10 hover:text-green-400"
      >
        &lt;
      </button>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 pr-2 -translate-y-1/2 text-3xl text-white z-10 hover:text-green-400"
      >
        &gt;
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex whitespace-nowrap overflow-x-auto scrollbar-hide px-2 rounded-2xl"
        style={{ scrollBehavior: "smooth" }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="min-w-50 flex flex-col items-center justify-center bg-zinc-800 rounded-lg p-3 m-2"
          >
            <h2 className="font-semibold text-sm text-zinc-400">{item.name}</h2>
            <p className="text-zinc-100 font-semibold text-sm">{item.value}</p>
            <p
              className={`text-sm font-semibold ${
                item.change.startsWith("+") ? "text-green-400" : "text-red-400"
              }`}
            >
              {item.change}
            </p>
          </div>
        ))}
      </div>

      {/* Hide Scrollbar */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}