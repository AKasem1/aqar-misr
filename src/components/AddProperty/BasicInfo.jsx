import React, { useState } from "react";
import RentBasicInfo from "./RentBasicInfo";
const BasicInfo = () => {
  const [selectedType, setSelectedType] = useState("إيجار");

  return (
    <div className="">
      <div className="p-6 space-y-6">
        <div className="flex gap-4" dir="rtl">
          <label className="flex items-center space-x-2 space-x-reverse">
            <input
              type="radio"
              name="propertyType"
              value="إيجار"
              className="w-4 h-4"
              onChange={(e) => setSelectedType(e.target.value)}
              checked={selectedType === "إيجار"}
            />
            <span>ايجار</span>
          </label>

          <label className="flex items-center space-x-2 space-x-reverse">
            <input
              type="radio"
              name="propertyType"
              value="تمليك"
              className="w-4 h-4"
              onChange={(e) => setSelectedType(e.target.value)}
              checked={selectedType === "تمليك"}
            />
            <span>تمليك</span>
          </label>
        </div>

        {selectedType ? (
          <RentBasicInfo type={selectedType} />
        ) : (
          <div className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">معلومات التمليك</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicInfo;
