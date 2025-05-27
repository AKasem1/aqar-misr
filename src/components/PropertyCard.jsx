import React from "react";
import PropertyAttribute from "./PropertyAttribute";
import Link from "next/link";
import { MapPin, Phone, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const PropertyCard = (props) => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const handleDelete = async (id) => {
    console.log("Delete property with id: ", id);
    try {
          const response = await fetch("/api/property/deleteProperty", {
            method: "DELETE",
            body: JSON.stringify({id}),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log(data);
          if (!response.ok) {
            Swal.fire(data.message, '', 'error')
            throw new Error(data.message || "Something went wrong!");
          }
          Swal.fire('تم حذف العقار بنجاح', '', 'success');
          router.push("/property/all");
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="border-2 border-gray-200 rounded-lg flex flex-col h-[400px] overflow-hidden">
      <Link href={"/property/" + props.id} className="h-full flex flex-col">
        {/* Property Image */}
        <div className="relative rounded-t-lg overflow-hidden h-[200px] w-full min-w-[300px]">
          {/* Blurred Background */}
          <div className="absolute inset-0 blur-lg">
            <Image
              src={props.propImage}
              fill
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
        <div className="px-4 py-2 flex flex-col gap-2 flex-grow overflow-hidden text-right">
          <h1 className="text-lg font-semibold">{props.propName}</h1>

          {/* Property Location */}
          <div className="flex flex-row-reverse items-center">
            <MapPin className="p-1" />
            <h2 className="truncate">{props.propCity}</h2>
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

          {/* Property Owner's Name */}
          {props.propOwnerName && (
            <div className="flex items-center justify-center gap-4">
              <MessageCircleMore className="size-4" />
              <p className="text-slate-600">{props.propOwnerName}</p>
            </div>
          )}
          {/* Property Owner's Phone */}
          <div className="flex items-center justify-center gap-4">
            <Phone className="p-1" />
            <p className="text-slate-600">{props.propOwnerPhone}</p>
          </div>

        </div>

        <hr />
        </Link>

        <div className="flex justify-center py-2 align-content-center gap-10">
        {user ? (
          user.type === "admin" || user.type === "employee" ? (
            <>
              <button className="p-1 text-red-500 rounded font-semibold" onClick={() => handleDelete(props.id)}>
                حذف العقار
              </button>
              <div className="border-l-2 border-gray-300 h-full"></div>
              <p className="text-sky-600 font-semibold hover:text-sky-800 p-1 cursor-pointer"
              onClick={() => router.push("/property/" + props.id)}
              >
              رؤية المزيد
            </p>
            </>
          ) : (
            <p className="text-sky-600 font-semibold hover:text-sky-800 p-1 cursor-pointer"
            onClick={() => router.push("/property/" + props.id)}
            >
              رؤية المزيد
            </p>
          )
        ) : null}
        </div>
    </div>
  );
};

export default PropertyCard;
