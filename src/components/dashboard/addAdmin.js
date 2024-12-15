import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Lock, Mail, Phone, User } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setAdmin } from "@/redux/slices/adminSlice";

export default function AddAdmin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [registerData, setRegisterData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/addAdmin", {
        method: "POST",
        body: JSON.stringify(registerData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        Swal.fire(data.message || "Something went wrong!", "", "error");
        throw new Error(data.message || "Error registering admin!");
      }
      dispatch(setAdmin(data));
      Swal.fire("تم إضافة الأدمن بنجاح", "", "success");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Aqar Misr | Add Admin</title>
        <meta name="description" content="Add a new admin to the system." />
        <meta property="og:title" content="Aqar Misr | Add Admin" />
      </Head>
      <div className="my-4">
        <div className="mx-auto max-w-md px-4">
          <motion.div
            className="rounded-xl bg-white p-6 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name">الاسم الكامل</label>
                <div className="flex border p-2 rounded-xl items-center">
                  <input
                    id="name"
                    type="text"
                    className="bg-transparent focus:outline-none w-10/12"
                    value={registerData.fullName}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, fullName: e.target.value })
                    }
                  />
                  <User className="mr-6 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phone">رقم الهاتف</label>
                <div className="flex border p-2 rounded-xl items-center">
                  <input
                    id="phone"
                    type="tel"
                    className="bg-transparent focus:outline-none w-10/12"
                    value={registerData.phone}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, phone: e.target.value })
                    }
                  />
                  <Phone className="mr-6 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="type">نوع المستخدم</label>
                <div className="flex border p-2 rounded-xl items-center">
                  <select
                    id="type"
                    className="bg-transparent focus:outline-none w-10/12"
                    value={registerData.type}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, type: e.target.value })
                    }
                  >
                    <option value="admin">أدمن</option>
                    <option value="employee">موظف</option>
                  </select>
                  <Building2 className="mr-6 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email">البريد الإلكتروني</label>
                <div className="flex border p-2 rounded-xl items-center">
                  <input
                    id="email"
                    type="email"
                    className="bg-transparent focus:outline-none w-10/12"
                    value={registerData.email}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, email: e.target.value })
                    }
                  />
                  <Mail className="mr-6 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password">كلمة المرور</label>
                <div className="flex border p-2 rounded-xl items-center">
                  <input
                    id="password"
                    type="password"
                    className="bg-transparent focus:outline-none w-10/12"
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, password: e.target.value })
                    }
                  />
                  <Lock className="mr-6 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password">تأكيد كلمة المرور</label>
                <div className="flex border p-2 rounded-xl items-center">
                  <input
                    id="confirm-password"
                    type="password"
                    className="bg-transparent focus:outline-none w-10/12"
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, confirmPassword: e.target.value })
                    }
                  />
                  <Lock className="mr-6 text-gray-400" />
                </div>
              </div>
              <button
                type="submit"
                className="bg-amber-600 w-full p-2.5 rounded-lg mt-4 text-white hover:bg-amber-800"
              >
                إنشاء حساب جديد
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}
