import React from "react";

/**
 * A section that displays the number of clients, years of experience, and the
 * number of properties on the website.
 *
 * This component displays a section with three columns, each containing a
 * heading and a paragraph. The first column contains the number of clients, the
 * second column contains the number of years of experience, and the third column
 * contains the number of properties. The section is styled with a teal background
 * and white text.
 *
 * @returns {React.ReactElement} A section element that displays the statistics.
 */
const Stats = () => {
  return (
    <div className="w-full p-16 bg-teal-900">
      <div className="grid grid-cols-1 gap-12 place-items-center text-center md:grid-cols-3 md:gap-0">
        <div>
          <h1 className="text-5xl text-amber-200 font-semibold">+100</h1>
          <h2 className="text-4xl text-white">عميل</h2>
        </div>
        <div>
          <h1 className="text-5xl text-amber-200 font-semibold">+10</h1>
          <h2 className="text-4xl text-white">سنوات خبرة</h2>
        </div>
        <div>
          <h1 className="text-5xl text-amber-200 font-semibold">+100</h1>
          <h2 className="text-4xl text-white">عقار</h2>
        </div>
      </div>
    </div>
  );
};

export default Stats;
