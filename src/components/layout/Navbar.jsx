import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
// import { Rubik } from "@next/font/google";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/router";
import { useState } from "react";

// const rubik = Rubik({
//   subsets: ["latin", "arabic"],
//   weight: ["400", "500", "700"],
//   display: 'swap',
// });

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = user ? true : false;
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // console.log("hi data from redux store: ", user, isAuthenticated, token);

  const handleSignout = (e) => {
    e.preventDefault();
    dispatch(logout());
    router.push("/auth");
  };

  return (
    <nav className="w-full bg-white text-teal-900 text-nowrap h-28 flex justify-between items-center px-6 resize-none">
      {/* Aqar Masr Logo */}
      <Link href={"/"}>
        <img className="max-w-16 min-w-16" src="/aqar_logo.png" alt="aqar misr logo" />
      </Link>

      {/* Links to diff pages */}
      <div dir="rtl" className="text-lg font-Rubik hidden lg:block">
        <Link
          className="px-4 py-2 hover:bg-gray-100 rounded-full transition"
          href="/">
          الرئيسية
        </Link>
        <Link
          className="px-4 py-2 hover:bg-gray-100 rounded-full transition"
          href="/property/all">
          عقاراتنا
        </Link>
        <Link
          className="px-4 py-2 hover:bg-gray-100 rounded-full transition"
          href="/about">
           عن عقار مصر 
        </Link>
        <Link
          className="px-4 py-2 hover:bg-gray-100 rounded-full transition"
          href="/articles">
          المدونة
        </Link>
        <Link
          className="px-4 py-2 hover:bg-gray-100 rounded-full transition"
          href="/contactus">
          تواصل معنا
        </Link>
      </div>

      <div className="flex items-center gap-10">
        {/*Agency's phone number*/}
        <div className="hidden items-center gap-4">
          <img
            className="size-5"
            src="/phone_icon.svg"
            alt="phone number icon"
          />
          <label className="text-sm">0106 285 8443</label>
        </div>

        {/* Buttons for specific users (i.e. User get Login/signup, Admins get Dashboard, etc) */}
        {user ? (
          user.type === "admin" || user.type === "employee" ? (
            <button className="px-7 py-2 border border-black rounded-full hover:bg-teal-900 hover:text-white transition-colors">
              <Link href="/dashboard">لوحة التحكم</Link>
            </button>
          ) : (
            <button className="px-7 py-2 border border-black rounded-full hover:bg-teal-900 hover:text-white transition-colors">
              <Link href="/property/add">اضافة عقار</Link>
            </button>
          )
        ) : (
          <button className="px-7 py-2 border border-black rounded-full hover:bg-teal-900 hover:text-white transition-colors">
            <Link href="/auth">تسجيل دخول</Link>
          </button>
        )}

        {/*Signout button*/}
        {user && (
          <button
            onClick={handleSignout}
            className="hidden lg:block px-7 py-2 text-white bg-teal-900 rounded-full hover:bg-white border border-teal-900 hover:text-black transition-colors">
            تسجيل خروج
          </button>
        )}

        {/*Hamburger Menu Button */}
        <button
          className="block lg:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          <img
            className="size-8"
            src="/Hamburger_icon.svg"
            alt="toggle menu icon"
          />
        </button>
      </div>

      {/*Mobile Menu from Hamburger Menu Miscellaneous*/}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-24 bg-gray-100 py-16 flex flex-col w-full items-center gap-4 z-50">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="px-4 py-2 hover:bg-gray-100 rounded-full transition">
            الرئيسية
          </Link>
          <Link
            href="/property/all"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="px-4 py-2 hover:bg-gray-100 rounded-full transition">
            عقاراتنا{" "}
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="px-4 py-2 hover:bg-gray-100 rounded-full transition">
            عن عقار مصر{" "}
          </Link>
          <Link
            href="/articles"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="px-4 py-2 hover:bg-gray-100 rounded-full transition">
            المدونة
          </Link>
          <Link
            href="/contactus"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="px-4 py-2 hover:bg-gray-100 rounded-full transition">
            تواصل معنا
          </Link>
          {user ? (
            <button
              onClick={handleSignout}
              className="px-7 py-2 text-white bg-teal-900 rounded-full hover:bg-white border border-teal-900 hover:text-black transition-colors">
              تسجيل خروج
            </button>
          ) : null}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
