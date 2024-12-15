import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Image } from "lucide-react";
import imgUpload from "@/pages/util/imgUpload";
import Swal from "sweetalert2";

export default function AddArticle() {
  const [articleData, setArticleData] = useState({
    title: "",
    image: null,
    paragraphs: [""],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!articleData.title || !articleData.image || articleData.paragraphs.length === 0) {
      // alert("يرجى ملء جميع الحقول");
      Swal.fire(data.message || "Something went wrong!", "", "error");
      return;
    }

    try {
      const response = await fetch("/api/article/addArticle", {
        method: "POST",
        body: JSON.stringify(articleData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        // alert(data.message || "حدث خطأ!");
        Swal.fire(data.message || "خطأ في إضافة المقال!", "", "error");
        throw new Error(data.message || "خطأ في إضافة المقال!");
      }
      // alert("تم إضافة المقال بنجاح");
      Swal.fire("تم إضافة المقال بنجاح", "", "success");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      const imageUrl = await imgUpload(image);
      setArticleData({ ...articleData, image: imageUrl });
    }
  };

  return (
    <div className="my-4">
      <div className="mx-auto max-w-md px-4">
        <motion.div
          className="rounded-xl bg-white p-6 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold mb-6">إضافة مقال</h1>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <label htmlFor="title" className="block">عنوان المقال</label>
              <div className="flex border p-2 rounded-xl items-center">
                <input
                  id="title"
                  type="text"
                  className="bg-transparent focus:outline-none w-10/12"
                  value={articleData.title}
                  onChange={(e) =>
                    setArticleData({ ...articleData, title: e.target.value })
                  }
                  placeholder="أدخل عنوان المقال"
                />
                <FileText 
                lassName="mr-6 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">رفع صورة المقال</label>
              <div className="flex border p-2 rounded-xl items-center">
                <input 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="file_input"
                type="file"
                onChange={handleImageUpload}
                />
                <Image className="mr-6 text-gray-400" />
              </div>
            </div>

            {articleData.paragraphs.map((paragraph, index) => (
              <div key={index} className="space-y-2">
                <label htmlFor={`paragraph-${index}`} className="block">المحتوى {index + 1}</label>
                <div className="flex border p-2 rounded-xl items-center">
                  <textarea
                    id={`paragraph-${index}`}
                    rows={4}
                    className="bg-transparent focus:outline-none w-10/12"
                    value={paragraph}
                    onChange={(e) =>
                      setArticleData({
                        ...articleData,
                        paragraphs: articleData.paragraphs.map((p, i) =>
                          i === index ? e.target.value : p
                        ),
                      })
                    }
                    placeholder="أدخل النص هنا"
                  />
                </div>

                {index === articleData.paragraphs.length - 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setArticleData({
                        ...articleData,
                        paragraphs: [...articleData.paragraphs, ""],
                      })
                    }
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    إضافة فقرة أخرى
                  </button>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="bg-amber-600 w-full p-2.5 rounded-lg mt-4 text-white hover:bg-amber-800"
            >
              إضافة المقال
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
