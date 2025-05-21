import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employee/getEmployees");
        if (response.status === 200) {
          setEmployees(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        Swal.fire("حدث خطأ أثناء جلب بيانات الموظفين", "", "error");
      }
    };

    fetchEmployees();
  }, []);

  const toggleDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(!showDetails);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rtl px-6 py-4 my-4"
    >
      <div className="overflow-x-auto bg-white rounded-xl">
        <table className="min-w-full text-right table-auto border-collapse">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="px-4 py-2 text-sm font-semibold">تفاصيل</th>
              <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">عدد المهام</th>
              <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">رقم الهاتف</th>
              <th className="px-4 py-2 text-sm font-semibold md:table-cell">البريد الإلكتروني</th>
              <th className="px-4 py-2 text-sm font-semibold md:table-cell">اسم الموظف</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                  لا يوجد موظفين حالياً
                </td>
              </tr>
            ) : (
              employees.map((employee) => (
                <tr key={employee._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleDetails(employee)}
                      className="bg-teal-500 text-white px-3 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                    >
                      تفاصيل
                    </button>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {employee.assignedProperties?.length || 0}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">{employee.phone}</td>
                  <td className="px-4 py-3 md:table-cell">{employee.email}</td>
                  <td className="px-4 py-3 md:table-cell">{employee.fullName}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Employee Details */}
      {showDetails && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto p-4 sm:p-6">
            <h2 className="text-xl font-bold text-teal-600 border-b pb-3 text-center">
              تفاصيل الموظف والمهام المخصصة
            </h2>
            
            {/* Employee Info */}
            <div className="mt-4 space-y-4" dir="rtl">
              <div className="flex justify-center">
                <div className="w-full max-w-4xl space-y-2">
                  <h3 className="font-semibold text-gray-700 text-center">معلومات الموظف</h3>
                  <div className="space-y-2 p-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">الاسم</span>
                      <span className="text-gray-600">{selectedEmployee.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">البريد الإلكتروني</span>
                      <span className="text-gray-600">{selectedEmployee.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">رقم الهاتف</span>
                      <span className="text-gray-600">{selectedEmployee.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">تاريخ الإضافة</span>
                      <span className="text-gray-600">
                        {new Date(selectedEmployee.createdAt).toLocaleDateString('ar-EG', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        //   hour: '2-digit',
                        //   minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assigned Properties */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-4 text-center">العقارات المخصصة</h3>
                {selectedEmployee.assignedProperties?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-right table-auto border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-sm font-semibold">اسم العقار</th>
                          <th className="px-4 py-2 text-sm font-semibold">نوع العقار</th>
                          <th className="px-4 py-2 text-sm font-semibold">السعر</th>
                          <th className="px-4 py-2 text-sm font-semibold">المساحة</th>
                          <th className="px-4 py-2 text-sm font-semibold">عدد الغرف</th>
                          <th className="px-4 py-2 text-sm font-semibold">عدد الحمامات</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedEmployee.assignedProperties.map((property) => (
                          <tr key={property._id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">{property.propertyName}</td>
                            <td className="px-4 py-3">{property.propertyType}</td>
                            <td className="px-4 py-3">جنيه {property.currentPrice}</td>
                            <td className="px-4 py-3">{property.propertyArea} متر</td>
                            <td className="px-4 py-3">{property.rooms}</td>
                            <td className="px-4 py-3">{property.bathrooms}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-gray-500">لا توجد عقارات مخصصة لهذا الموظف</p>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowDetails(false)}
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Employees;