import React from "react";
import PropertyListView from "../PropertyListView";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Properties = () => {
  return (
    <div className="w-full p-12 flex flex-col items-center justify-center gap-6">
      <div className="relative w-full flex items-center mt-10">
        <Link
          href="/property/all"
          className="absolute right-0 -top-10 sm:-top-0 text-blue-500 inline-flex items-center">
          رؤية المزيد
          <ArrowRight className="p-1" />
        </Link>
        <h1 className="w-full text-center text-3xl font-semibold text-nowrap">
          أحدث العقارات
        </h1>
      </div>
      <p className="text-slate-500">كل ما تبحث عنه من منازل وشقق حديثة</p>

      <PropertyListView />
    </div>
  );
};

export default Properties;
