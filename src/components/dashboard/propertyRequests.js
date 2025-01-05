import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { acceptRequest, rejectRequest, setPropertyRequests } from "@/redux/slices/requestSlice";

const PropertyRequest = () => {
  const dispatch = useDispatch();
  const propertyRequests = useSelector((state) => state.property.requests);
  const [showDetails, setShowDetails] = useState(false);
  const [accept, setAccept] = useState(false);
  const [requests, setRequests] = useState([])
  const [selectedRequest, setSelectedRequst] = useState({})
  const router = useRouter();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/property/getRequests").catch(error => console.log(error));

        if (response && (response?.status == 200)) {
          console.log(response)
          const data = await response.data;
          console.log("Requests: ", data)
          setRequests(data.data || []);
          dispatch(setPropertyRequests(data.data || []))
        }
      } catch (error) {
        console.error("Error fetching property requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const toggleDetails = (request) => {
    setShowDetails(!showDetails);
    setSelectedRequst(request)
  };

  const handleAccept = async (id) => {
    try {
      const response = await fetch("/api/property/handleRequest", {
        method: "POST",
        body: JSON.stringify({ accept: true, id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        Swal.fire(data.message, '', 'error')
        throw new Error(data.message || "Something went wrong!");
      }
      dispatch(acceptRequest({ id }));
      Swal.fire('تم قبول طلب العقار بنجاح', '', 'success');
      router.push("/dashboard");
    } catch (error) {
      console.error("Error fetching property requests:", error);
    }
  }

  const handleDecline = async (id) => {
    try {
      const response = await fetch("/api/property/handleRequest", {
        method: "POST",
        body: JSON.stringify({ accept, id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        Swal.fire(data.message, '', 'error')
        throw new Error(data.message || "Something went wrong!");
      }
      dispatch(rejectRequest({ id }));
      Swal.fire('تم رفض طلب العقار بنجاح', '', 'success');
      router.push("/dashboard");
    } catch (error) {
      console.error("Error fetching property requests:", error);
    }
  }

  return (
    <div className="rtl px-6 py-4 my-4">
      <div className="overflow-x-auto bg-white rounded-xl">
        <table className="min-w-full text-right table-auto border-collapse">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="px-4 py-2 text-sm font-semibold">تفاصيل</th>
              <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">الموقع</th>
              <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">الحمامات</th>
              <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">الغرف</th>
              <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">المساحة</th>
              <th className="px-4 py-2 text-sm font-semibold md:table-cell">السعر</th>
              <th className="px-4 py-2 text-sm font-semibold md:table-cell">النوع</th>
              <th className="px-4 py-2 text-sm font-semibold md:table-cell">اسم العقار</th>
              <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">رقم التليفون</th>
              <th className="px-4 py-2 text-sm font-semibold md:table-cell">اسم المستخدم</th>
            </tr>
          </thead>
          <tbody>
            {propertyRequests ? propertyRequests.map((request) => (
              <tr key={request._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleDetails(request)}
                    className="bg-teal-500 text-white px-3 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    تفاصيل
                  </button>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">{request.city}</td>
                <td className="px-4 py-3 hidden md:table-cell">{request.bathrooms}</td>
                <td className="px-4 py-3 hidden md:table-cell">{request.rooms}</td>
                <td className="px-4 py-3 hidden md:table-cell">{request.propertyArea} متر</td>
                <td className="px-4 py-3 md:table-cell">{request.currentPrice} جنيه</td>
                <td className="px-4 py-3 md:table-cell">{request.propertyType}</td>
                <td className="px-4 py-3 md:table-cell">{request.propertyName}</td>
                <td className="px-4 py-3 hidden md:table-cell">{request.addedBy?.phone}</td>
                <td className="px-4 py-3 md:table-cell">{request.addedBy?.fullName}</td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>

      {/* Modal for Property Details */}
      {showDetails && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto p-4 sm:p-6">
      <h2 className="text-xl font-bold text-teal-600 border-b pb-3 text-center">
        تفاصيل العقار
      </h2>
      <div className="mt-4 space-y-4" dir="rtl">
        {/* Mobile-Only Details */}
        <div className="md:hidden space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">رقم التليفون</span>
            <span className="text-gray-600">{selectedRequest.addedBy?.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">المساحة</span>
            <span className="text-gray-600">{selectedRequest.propertyArea} متر</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">عدد الغرف</span>
            <span className="text-gray-600">{selectedRequest.rooms}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">الحمامات</span>
            <span className="text-gray-600">{selectedRequest.bathrooms}</span>
          </div>
        </div>

        {/* Common Details */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">الموقع</span>
            <span className="text-gray-600">{selectedRequest.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">المدينة</span>
            <span className="text-gray-600">{selectedRequest.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">نوع العقد</span>
            <span className="text-gray-600">{selectedRequest.contractType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">مطبخ</span>
            <span className="text-gray-600">
              {selectedRequest.hasKitchen ? "نعم" : "لا"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">حديقة</span>
            <span className="text-gray-600">
              {selectedRequest.hasGarden ? "نعم" : "لا"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">مصعد</span>
            <span className="text-gray-600">
              {selectedRequest.hasElevator ? "نعم" : "لا"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">كاميرات</span>
            <span className="text-gray-600">
              {selectedRequest.hasCameras ? "نعم" : "لا"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">عدادات</span>
            <span className="text-gray-600">
              {selectedRequest.hasMeters ? "نعم" : "لا"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">تدفئة</span>
            <span className="text-gray-600">
              {selectedRequest.hasHeating ? "نعم" : "لا"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">مكيف هواء</span>
            <span className="text-gray-600">
              {selectedRequest.hasAC ? "نعم" : "لا"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">مفروش</span>
            <span className="text-gray-600">
              {selectedRequest.isFurnished ? "نعم" : "لا"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={toggleDetails}
          className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
        >
          إغلاق
        </button>
        <button
          onClick={() => handleDecline(selectedRequest._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
        >
          رفض
        </button>
        <button
          onClick={() => handleAccept(selectedRequest._id)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          قبول
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default PropertyRequest;