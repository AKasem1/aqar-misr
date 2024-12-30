import React from "react";
import PropertyAttribute from "./PropertyAttribute";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";

const PropertyCard = (props) => {
  return (
    <div className="border-2 border-gray-200 rounded-lg flex flex-col h-[400px]">
      <Link href={"/property/" + props.id} className="h-full flex flex-col">
        {/* Property Image */}
        <div className="relative rounded-t-lg overflow-hidden h-[200px] w-full min-w-[300px]">
          {/* Blurred Background */}
          <div className="absolute inset-0 blur-lg">
            <img
              src={props.propImage}
              alt="Property Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Clear Foreground Image */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <img
              src={props.propImage}
              alt="Property Image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="px-4 py-2 flex flex-col gap-2 flex-grow overflow-hidden">
          <h1 className="text-lg font-semibold">{props.propName}</h1>

          {/* Property Location */}
          <div className="flex flex-row-reverse items-center">
            <MapPin className="p-1" />
            <h2 className="truncate">{props.propLocation}</h2>
          </div>

          {/* Property Attributes */}
          <div className="flex justify-between">
            {/* Example of attributes mapping */}
            {/* Uncomment if needed */}
            {/* props.propAttributes.map((attribute) => (
              <PropertyAttribute
                key={attribute.id}
                iconSrc={attribute.icon}
                value={attribute.value}
              />
            )) */}
          </div>

          <hr />

          {/* Property Owner's Phone */}
          <div className="flex items-center justify-center gap-4">
            <Phone className="p-1" />
            <p className="text-slate-600">{props.propOwnerPhone}</p>
          </div>

          {/* Property Owner's Whatsapp */}
          {props.propOwnerWhatsApp && (
            <div className="flex items-center justify-center gap-4">
              <img
                className="size-4"
                src="whatsapp_icon.svg"
                alt="Owner's Whatsapp icon"
              />
              <p className="text-slate-600">{props.propOwnerWhatsApp}</p>
            </div>
          )}
        </div>

        <hr />

        {/* "رؤية المزيد" Section */}
        <div className="flex justify-center py-2">
          <p className="text-sky-600 font-semibold hover:text-sky-800">
            رؤية المزيد
          </p>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
