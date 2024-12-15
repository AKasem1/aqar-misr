import React from "react";

const PropSearchField = () => {
  return (
    <div className="w-3/4 sm:w-1/2 pl-4 pr-1 py-1 bg-white shadow flex justify-between border-2 rounded-full focus-within:border-sky-600">
      <input
        className="focus:outline-none w-11/12 bg-transparent"
        type="text"
        placeholder="ابحث عن عقاراتك"
      />
      <button className="bg-amber-200 px-4 py-2 rounded-full aspect-square hover:bg-orange-300 active:bg-orange-400 transition-colors">
        <img className="size-4" src="search_icon.svg" alt="search property icon"/>
      </button>
    </div>
  );
};

export default PropSearchField;
