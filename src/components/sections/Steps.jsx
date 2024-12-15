import React from "react";

/**
 * A section that displays the steps to benefit from the website.
 *
 * This component displays a section with a heading, a paragraph, and three
 * columns, each containing an image, a heading and a paragraph. The section is
 * styled with a white background and black & slate text.
 *
 * @returns {React.ReactElement} A section element that displays the steps.
 */
const Steps = () => {
  return (
    <div className="p-6 text-center md:p-32">
      <h1 className="text-3xl font-bold">كيف تستفيد من موقعنا</h1>

      <p className="text-slate-500">خطوات سهلة للاستفادة من جميع الميزات</p>

      <div className="grid grid-cols-1 gap-10 mt-12 md:grid-cols-3">
        <div className="space-y-6">
          <img className="mx-auto" src="step1_image.png" alt="step 1 image" />
          <h1 className="text-2xl font-semibold">
            اختر عقارك الأنسب في أقل من شهر
          </h1>
          <p className="text-slate-500">
          عملية سهلة وسريعة للعثور على منزلك المثالي
          </p>
        </div>

        <div className="space-y-6">
          <img className="mx-auto" src="step2_image.png" alt="step 2 image" />
          <h1 className="text-2xl font-semibold">
            قم بزيارة للعقار مع واحد من وكلائنا
          </h1>
          <p className="text-slate-500">
          حدد موعدك اليوم لزيارة العقار
          </p>
        </div>

        <div className="space-y-6">
          <img className="mx-auto" src="step3_image.png" alt="step 2 image" />
          <h1 className="text-2xl font-semibold">
            ابحث عن العقار المفضل فى موقعك
          </h1>
          <p className="text-slate-500">
          استخدم الفلاتر للعثور على عقارك المثالي
          </p>
        </div>

      </div>
    </div>
  );
};

export default Steps;
