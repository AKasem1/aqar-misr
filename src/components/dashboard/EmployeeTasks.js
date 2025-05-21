import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";

export default function EmployeeTasks({ employeeId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/api/employee/getEmployeeTasks?employeeId=${employeeId}`);
        if (response.status === 200) {
          console.log("Response: ", response.data)
          setTasks(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        Swal.fire("حدث خطأ أثناء جلب المهام", "", "error");
      }
    };

    if (employeeId) {
      fetchTasks();
    }
  }, [employeeId]);

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
              <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">عدد الحمامات</th>
              <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">عدد الغرف</th>
              <th className="px-4 py-2 text-sm font-semibold hidden md:table-cell">المساحة</th>
              <th className="px-4 py-2 text-sm font-semibold md:table-cell">السعر</th>
              <th className="px-4 py-2 text-sm font-semibold md:table-cell">نوع العقار</th>
              <th className="px-4 py-2 text-sm font-semibold md:table-cell">اسم العقار</th>
              <th className="px-4 py-2 text-sm font-semibold md:table-cell">رقم الهاتف</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-3 text-center text-gray-500">
                  لا توجد مهام مخصصة لك حالياً
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 hidden md:table-cell">{task.bathrooms}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{task.rooms}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{task.propertyArea} متر</td>
                  <td className="px-4 py-3 md:table-cell">جنيه {task.currentPrice}</td>
                  <td className="px-4 py-3 md:table-cell">{task.propertyType}</td>
                  <td className="px-4 py-3 md:table-cell">{task.propertyName}</td>
                  <td className="px-4 py-3 md:table-cell">{task.seller.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
} 