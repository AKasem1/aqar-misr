import React from "react";

/**
 * A section that displays a newsletter subscription form.
 *
 * This component displays a section with a teal background, an image, a
 * heading, a paragraph, and a form. The form contains a text input field and
 * a submit button.
 *
 * @returns {React.ReactElement} A section element that displays the
 * newsletter subscription form.
 */
const Newsletter = () => {
  return (
    <div className="w-full py-10 md:p-12 bg-teal-900 text-white text-center flex flex-col items-center justify-center space-y-6">
      <img src="newsletter_image.svg" alt="news letter image" />
      <h1 className="font-semibold text-2xl lg:text-3xl">
        تابع أحدث المشاريع والعقارات
      </h1>
      <p>اشترك في مدونتنا الأسبوعية</p>

      <form
        className="w-2/3 flex bg-teal-800 rounded-full px-4 py-3 border-transparent border-2 lg:w-1/2 focus-within:bg-teal-700 focus-within:border-teal-400 transition-colors"
        onSubmit={(e) => e.preventDefault()}>
        <input
          className="w-11/12 bg-transparent focus:outline-none"
          type="text"
          placeholder="البريد الالكتروني"
        />

        <button type="submit" className="px-2 text-nowrap">
          Send →
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
