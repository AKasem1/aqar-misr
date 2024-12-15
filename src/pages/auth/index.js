import { React, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Building2, Lock, Mail, Phone, User } from "lucide-react";
import Head from "next/head";
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAdmin } from "@/redux/slices/adminSlice";
import { setUser } from "@/redux/slices/authSlice";

export default function Component() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [isFlipping, setIsFlipping] = useState(false);
    const [registerData, setRegisterData] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        type: "",
    });
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("isLogin: ", isLogin);
    console.log("Form Data: ", isLogin ? loginData : registerData);
    try {
      if (!isLogin) {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(registerData),
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
        const userData = { user: data.user, token: data.token };
        console.log("user data: ", userData)
        dispatch(setUser(userData));
        Swal.fire('تم إنشاء الحساب بنجاح', '', 'success');
        router.push("/");
      } else {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(loginData),
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
        const userData = { user: data.user, token: data.token };
        console.log("user data: ", userData)
        dispatch(setUser(userData));
        Swal.fire('تم تسجيل الدخول بنجاح', '', 'success');
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsFlipping(false);
    }, 400);
  };

  return (
    <>
      <Head>
        <title>Aqar Misr | Sign-in</title>
        <meta name="description" content="سجل الدخول الان للتسجيل في موقع عقار مصر" />
        <meta name="keywords" content="Aqar Misr, تسجيل دخول, اشتراك, اشتراك في موقع عقار مصر" />
        <meta property="og:title" content="Aqar Misr | Sign-in" />
        <meta property="og:description" content="سجل الدخول الان للتسجيل في موقع عقار مصر" />
        <meta property="og:url" content="https://aqarmisr.com/auth" />
      </Head>
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container relative mx-auto max-w-sm px-4">
          <div className="mb-8 flex justify-center gap-4 text-lg">
            <button
              onClick={() => !isLogin && toggleForm()}
              className={cn(
                "relative px-4 py-2 transition-colors",
                isLogin ? "text-[#1d4942] font-semibold" : "text-gray-600"
              )}
            >
              تسجيل دخول
              {isLogin && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#e4c66c]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
            <button
              onClick={() => isLogin && toggleForm()}
              className={cn(
                "relative px-4 py-2 transition-colors",
                !isLogin ? "text-teal-900 font-semibold" : "text-gray-600"
              )}
            >
              إنشاء حساب
              {!isLogin && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-amber-300"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{ rotateY: isFlipping ? 90 : 0, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="rounded-xl bg-white p-6 shadow-lg"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="name">الاسم الكامل</label>
                      <div className="focus-within:border-sky-500 focus-within:bg-sky-100 flex border p-2 rounded-xl items-center">
                        <input
                          id="name"
                          type="text"
                          className="bg-transparent focus:outline-none w-10/12"
                          value={registerData.fullName}
                          onChange={(e) =>
                            setRegisterData({ ...registerData, fullName: e.target.value })
                          }
                        />
                        <User className="size-5 mr-6 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone">رقم الهاتف</label>
                      <div className="focus-within:border-sky-500 focus-within:bg-sky-100 flex border p-2 rounded-xl items-center">
                        <input
                          id="phone"
                          type="tel"
                          className="bg-transparent focus:outline-none w-10/12"
                          value={registerData.phone}
                          onChange={(e) =>
                            setRegisterData({ ...registerData, phone: e.target.value })
                          }
                        />
                        <Phone className="size-5 mr-6 text-gray-400" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="type">نوع المستخدم</label>
                      <div className="focus-within:border-sky-500 focus-within:bg-sky-100 flex border p-2 rounded-xl items-center">
                        <select
                          id="type"
                          className="bg-transparent focus:outline-none w-10/12"
                          value={registerData.type}
                          onChange={(e) =>
                            setRegisterData({ ...registerData, type: e.target.value })
                          }
                        >
                          <option value="">اختر نوع المستخدم</option>
                          <option value="مستأجر">مستأجر</option>
                          <option value="مؤجر">مؤجر</option>
                        </select>
                        <Building2 className="size-5 mr-6 text-gray-400" />
                      </div>
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <label htmlFor="email">البريد الإلكتروني</label>
                  <div className="focus-within:border-sky-500 focus-within:bg-sky-100 flex border p-2 rounded-xl items-center">
                    <input
                      id="email"
                      type="email"
                      className="bg-transparent focus:outline-none w-10/12"
                      value={isLogin ? loginData.email : registerData.email}
                      onChange={(e) =>
                        isLogin
                          ? setLoginData({ ...loginData, email: e.target.value })
                          : setRegisterData({ ...registerData, email: e.target.value })
                      }
                    />
                    <Mail className="size-5 mr-6 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="password">كلمة المرور</label>
                  <div className="focus-within:border-sky-500 focus-within:bg-sky-100 flex border p-2 rounded-xl items-center">
                    <input
                      id="password"
                      type="password"
                      className="bg-transparent focus:outline-none w-10/12"
                      value={isLogin ? loginData.password : registerData.password}
                      onChange={(e) =>
                        isLogin
                          ? setLoginData({ ...loginData, password: e.target.value })
                          : setRegisterData({ ...registerData, password: e.target.value })
                      }
                    />
                    <Lock className="size-5 mr-6 text-gray-400" />
                  </div>
                </div>
                {!isLogin && (
                  <div className="space-y-2">
                    <label htmlFor="confirm-password">تاكيد كلمة المرور</label>
                    <div className="focus-within:border-sky-500 focus-within:bg-sky-100 flex border p-2 rounded-xl items-center">
                      <input
                        id="confirm-password"
                        type="password"
                        className="bg-transparent focus:outline-none w-10/12"
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          setRegisterData({ ...registerData, confirmPassword: e.target.value })
                        }
                      />
                      <Lock className="size-5 mr-6 text-gray-400" />
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-amber-300 w-full p-2.5 mt-5 rounded-xl hover:bg-amber-400"
                >
                  {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
