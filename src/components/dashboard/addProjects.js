import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Image } from "lucide-react";
import imgUpload from "@/pages/util/imgUpload";
import Swal from "sweetalert2";

export default function AddProjects() {
  const [projectData, setprojectData] = useState({
    title: "",
    image: null,
    description: "",
    address: "",
    propertiesCount: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!projectData.title || !projectData.image || !projectData.description || !projectData.address || !projectData.propertiesCount) {
      // alert("يرجى ملء جميع الحقول");
      Swal.fire(data.message || "Something went wrong!", "", "error");
      return;
    }

    try {
      const response = await fetch("/api/project/addProject", {
        method: "POST",
        body: JSON.stringify(projectData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        // alert(data.message || "حدث خطأ!");
        Swal.fire(data.message || "خطأ في إضافة المشروع!", "", "error");
        throw new Error(data.message || "خطأ في إضافة المشروع!");
      }
      // alert("تم إضافة المشروع بنجاح");
      Swal.fire("تم إضافة المشروع بنجاح", "", "success");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      const imageUrl = await imgUpload(image);
      setprojectData({ ...projectData, image: imageUrl });
    }
  };

  return (
    <div className="my-4">
      <div className="mx-auto max-w-md px-4">
        <motion.div
          className="rounded-xl bg-white p-6 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold mb-6">إضافة مشروع</h1>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <label htmlFor="title" className="block">اسم المشروع</label>
              <div className="flex border p-2 rounded-xl items-center">
                <input
                  id="title"
                  type="text"
                  className="bg-transparent focus:outline-none w-10/12"
                  value={projectData.title}
                  onChange={(e) =>
                    setprojectData({ ...projectData, title: e.target.value })
                  }
                  placeholder="أدخل اسم المشروع"
                />
                <FileText 
                className="mr-6 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="file_input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">رفع صورة المشروع</label>
              <div className="flex border p-2 rounded-xl items-center">
                <input 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="file_input"
                type="file"
                onChange={handleImageUpload}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block">وصف المشروع</label>
              <div className="flex border p-2 rounded-xl items-center">
                <input
                  id="description"
                  type="text"
                  className="bg-transparent focus:outline-none w-10/12"
                  value={projectData.description}
                  onChange={(e) =>
                    setprojectData({ ...projectData, description: e.target.value })
                  }
                  placeholder="أدخل وصف المشروع"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="address" className="block">عنوان المشروع</label>
              <div className="flex border p-2 rounded-xl items-center">
                <input
                  id="address"
                  type="text"
                  className="bg-transparent focus:outline-none w-10/12"
                  value={projectData.address}
                  onChange={(e) =>
                    setprojectData({ ...projectData, address: e.target.value })
                  }
                  placeholder="أدخل عنوان المشروع"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="propertiesCount" className="block">عدد العقارات المتاحة</label>
              <div className="flex border p-2 rounded-xl items-center">
                <input
                  id="propertiesCount"
                  type="text"
                  className="bg-transparent focus:outline-none w-10/12"
                  value={projectData.propertiesCount}
                  onChange={(e) =>
                    setprojectData({ ...projectData, propertiesCount: e.target.value })
                  }
                  placeholder="أدخل عدد العقارات المتاحة"
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="bg-amber-600 w-full p-2.5 rounded-lg mt-4 text-white hover:bg-amber-800"
            >
              إضافة المشروع
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
