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
      // console.log(data);
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
      // console.log(data);
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
    <div className="space-y-6 rtl px-6 py-4 my-4">
      <div className="overflow-x-auto bg-white rounded-xl">
        <table className="min-w-full text-right table-auto border-collapse">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="px-4 py-2 text-sm font-semibold">رفض</th>
              <th className="px-4 py-2 text-sm font-semibold">قبول</th>
              <th className="px-4 py-2 text-sm font-semibold">تفاصيل</th>
              <th className="px-4 py-2 text-sm font-semibold">الموقع</th>
              <th className="px-4 py-2 text-sm font-semibold">الحمامات</th>
              <th className="px-4 py-2 text-sm font-semibold">الغرف</th>
              <th className="px-4 py-2 text-sm font-semibold">المساحة</th>
              <th className="px-4 py-2 text-sm font-semibold">السعر</th>
              <th className="px-4 py-2 text-sm font-semibold">النوع</th>
              <th className="px-4 py-2 text-sm font-semibold">اسم العقار</th>
              <th className="px-4 py-2 text-sm font-semibold">رقم التليفون</th>
              <th className="px-4 py-2 text-sm font-semibold">اسم المستخدم</th>
            </tr>
          </thead>
          <tbody>
            {propertyRequests ? propertyRequests.map((request) => (
              <tr key={request._id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDecline(request._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    رفض
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleAccept(request._id)}
                    className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    قبول
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleDetails(request)}
                    className="bg-teal-500 text-white px-3 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                  >
                    تفاصيل
                  </button>
                </td>
                <td className="px-4 py-3">{request.city}</td>
                <td className="px-4 py-3">{request.bathrooms}</td>
                <td className="px-4 py-3">{request.rooms}</td>
                <td className="px-4 py-3">{request.propertyArea} متر</td>
                <td className="px-4 py-3">{request.currentPrice} جنيه</td>
                <td className="px-4 py-3">{request.propertyType}</td>
                <td className="px-4 py-3">{request.propertyName}</td>
                <td className="px-4 py-3">{request.addedBy?.phone}</td>
                <td className="px-4 py-3">{request.addedBy?.fullName}</td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>


      {/* Modal for Property Details */}
      {showDetails && (
        <div className="fixed -top-10 right-0 bottom-0 w-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg p-6 relative">
            <h2 className="text-xl font-bold text-teal-600 border-b pb-3 text-center">
              تفاصيل العقار
            </h2>
            <table className="w-full border-collapse text-sm" dir="rtl">
              <tbody>

                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold text-gray-700">الموقع</td>
                  <td className="py-2 px-4 text-gray-600">{selectedRequest.location}</td>
                </tr>

                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold text-gray-700">نوع العقد</td>
                  <td className="py-2 px-4 text-gray-600">{selectedRequest.contractType}</td>
                </tr>

                {/* Additional Features */}
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold text-gray-700">مطبخ</td>
                  <td className="py-2 px-4 text-gray-600">
                    {selectedRequest.hasKitchen ? "نعم" : "لا"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold text-gray-700">حديقة</td>
                  <td className="py-2 px-4 text-gray-600">
                    {selectedRequest.hasGarden ? "نعم" : "لا"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold text-gray-700">مصعد</td>
                  <td className="py-2 px-4 text-gray-600">
                    {selectedRequest.hasElevator ? "نعم" : "لا"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold text-gray-700">كاميرات</td>
                  <td className="py-2 px-4 text-gray-600">
                    {selectedRequest.hasCameras ? "نعم" : "لا"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold text-gray-700">عدادات</td>
                  <td className="py-2 px-4 text-gray-600">
                    {selectedRequest.hasMeters ? "نعم" : "لا"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold text-gray-700">تدفئة</td>
                  <td className="py-2 px-4 text-gray-600">
                    {selectedRequest.hasHeating ? "نعم" : "لا"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold text-gray-700">مكيف هواء</td>
                  <td className="py-2 px-4 text-gray-600">
                    {selectedRequest.hasAC ? "نعم" : "لا"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-semibold text-gray-700">مفروش</td>
                  <td className="py-2 px-4 text-gray-600">
                    {selectedRequest.isFurnished ? "نعم" : "لا"}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end mt-6">
              <button
                onClick={toggleDetails}
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyRequest;
