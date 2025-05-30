import React, { useState } from "react";
import PropSearchField from "../PropSearchField";
import Link from "next/link";

const Hero = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`h-[calc(100vh-110px)] ${
        isFocused ? "bg-white" : "bg-[url('/hero_bg.png')]"
      } flex flex-col p-6 space-y-8 items-center bg-no-repeat bg-cover bg-left-bottom text-teal-900 transition-colors`}
    >
      <Link
        className="border border-black px-6 py-2 rounded-full hover:bg-teal-900 hover:text-white transition-colors"
        href="/property/all"
      >
        أحدث المشاريع
      </Link>

      <p className="text-center">
        موقع عقار مصر يعرض كل ماهو جديد في عالم العقارات في مصر بشكل عام والعاصمة
        الادارية بشكل خاص
      </p>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold ">
        موقع عقار مصر
      </h1>

      {/* Pass focus handlers to PropSearchField */}
      <PropSearchField
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <p className="font-semibold">أفضل موقع تسويق عقاري في مصر</p>

      <div className="flex gap-6">
        <Link
          href={"/"}
          className="px-4 py-2 border-2 rounded-full hover:bg-teal-900 hover:text-white transition-colors"
        >
          بيع
        </Link>
        <Link
          href={"/"}
          className="px-4 py-2 border-2 rounded-full hover:bg-teal-900 hover:text-white transition-colors"
        >
          أيجار
        </Link>
      </div>
    </div>
  );
};

export default Hero;
