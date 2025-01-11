// pages/contact.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux";

const ContactUs = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const [formState, setFormState] = useState({
    userId: user?._id,
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (value.trim() !== '') {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formState.name.trim() === '',
      email: formState.email.trim() === '',
      message: formState.message.trim() === '',
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
        Swal.fire('يجب تسجيل الدخول أولًا', '', 'error');
        router.push('/auth');
        return;
    }

    formState.userId = user._id;

    if (!validateForm()) {
      Swal.fire('يجب إدخال جميع البيانات', '', 'error');
      return;
    }

    console.log('Submitting form:', formState);

    try {
      const response = await fetch('/api/contactus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        Swal.fire(data.message || 'حدث خطأ!', '', 'error');
        return;
      }

      Swal.fire('تم إرسال الرسالة بنجاح!', '', 'success');
      router.push('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      Swal.fire('An error occurred. Please try again.', '', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        className="border rounded-lg p-6 lg:p-12 space-y-5 w-full max-w-4xl mx-auto flex gap-10 bg-white shadow-lg"
        dir="rtl"
        onSubmit={handleSubmit}
      >
        <div className="flex-1">
          <h2 className="text-xl text-center font-bold mb-4">تواصل معنا</h2>

          <div className="space-y-2 mb-2">
            <label className="block text-md font-semibold text-gray-900">
              الاسم <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="الاسم"
              className={`w-full p-2 border rounded-lg ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formState.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">الرجاء إدخال الاسم</p>
            )}
          </div>

          <div className="space-y-2 mb-2">
            <label className="block text-md font-semibold text-gray-900">
              البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className={`w-full p-2 border rounded-lg ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formState.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">الرجاء إدخال بريد إلكتروني صحيح</p>
            )}
          </div>

          <div className="space-y-2 mb-2">
            <label className="block text-md font-semibold text-gray-900">
              الرسالة <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="الرسالة"
              rows={4}
              className={`w-full p-2 border rounded-lg ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              value={formState.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">الرجاء إدخال الرسالة</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-800 text-white rounded-lg py-2 mt-4"
          >
            إرسال
          </button>
        </div>

        <div className="hidden lg:block flex-1">
          <Image
            src="/contactus-image.jpg"
            className="rounded-lg shadow-md w-full h-full object-cover"
            alt="Contact Us"
            width={500}
            height={500}
          />
        </div>
      </form>
    </div>
  );
};

export default ContactUs;