import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import axios from "axios";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { acceptRequest, rejectRequest, setPropertyRequests } from "@/redux/slices/requestSlice";

const PropertyRequest = ({ employees }) => {
  const dispatch = useDispatch();
  const propertyRequests = useSelector((state) => state.property.requests);
  const [showDetails, setShowDetails] = useState(false);
  const [accept, setAccept] = useState(false);
  const [requests, setRequests] = useState([])
  const [selectedRequest, setSelectedRequst] = useState({})
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const router = useRouter();
  // console.log(employees)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/property/getRequests").catch(error => console.log(error));

        if (response && (response?.status == 200)) {
          const data = await response.data;
          setRequests(data.data || []);
          dispatch(setPropertyRequests(data.data || []));
          
          // Initialize selectedEmployees with existing assignments
          const initialAssignments = {};
          data.data?.forEach(request => {
            if (request.assignedEmployees?.length > 0) {
              initialAssignments[request._id] = request.assignedEmployees[0];
            }
          });
          setSelectedEmployees(initialAssignments);
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

  const handleEmployeeChange = async (requestId, employeeId) => {
    try {
      console.log("requestId: ", requestId)
      console.log("employeeId: ", employeeId)
      const response = await fetch("/api/property/assignEmployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          requestId, 
          employeeId 
        }),
      });

      const data = await response.json();
      console.log("data: ", data)
      
      if (!response.ok) {
        Swal.fire(data.message || 'حدث خطأ أثناء تعيين الموظف', '', 'error');
        return;
      }

      setSelectedEmployees(prev => ({
        ...prev,
        [requestId]: employeeId
      }));

      Swal.fire('تم تعيين الموظف بنجاح', '', 'success');
    } catch (error) {
      console.error("Error assigning employee:", error);
      Swal.fire('حدث خطأ أثناء تعيين الموظف', '', 'error');
    }
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
      setShowDetails(false)
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
              <th className="px-4 py-2 text-sm font-semibold w-full text-center">اختيار موظف</th>
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
                  <select
                    value={request.assignedEmployees?.length > 0 ? request.assignedEmployees[0] : ""}
                    onChange={(e) => handleEmployeeChange(request._id, e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="" disabled>اختر الموظف</option>
                    {employees?.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.fullName}
                      </option>
                    ))}
                  </select>
                </td>
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
                <td className="px-4 py-3 md:table-cell">جنيه {request.currentPrice}</td>
                <td className="px-4 py-3 md:table-cell">{request.propertyType}</td>
                <td className="px-4 py-3 md:table-cell">{request.propertyName}</td>
                <td className="px-4 py-3 hidden md:table-cell">{request.seller.phone}</td>
                <td className="px-4 py-3 md:table-cell">{request.seller.name}</td>
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
                  <span className="font-semibold text-gray-700">المجموعة</span>
                  <span className="text-gray-600">{selectedRequest.propertyGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">المبنى</span>
                  <span className="text-gray-600">{selectedRequest.propertyBuilding}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">رقم العقار</span>
                  <span className="text-gray-600">{selectedRequest.propertyNumber}</span>
                </div>
                {selectedRequest.contractType === "تمليك" && (
                  <>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">قيمة القسط</span>
                      <span className="text-gray-600">{selectedRequest.installmentAmount} جنيه</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">الدفعة المقدمة</span>
                      <span className="text-gray-600">{selectedRequest.upFrontPayment} جنيه</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">سنوات التقسيط</span>
                      <span className="text-gray-600">{selectedRequest.yearsOfInstallments} سنة</span>
                    </div>
                  </>
                )}
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
                disabled={!selectedEmployees[selectedRequest._id]}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedEmployees[selectedRequest._id]
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
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