import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("/api/article/getArticles").catch(error => console.log(error));

        console.log("Articles Response", response)
        if (response && (response?.status == 200)) {
          console.log(response)
          const data = await response.data;
          console.log("Articles: ", data)
          setArticles(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching Articles:", error);
      }
    };

    fetchArticles();
  }, []);


  return (
    <div className="space-y-6 rtl px-6 py-4 my-4 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-teal-600 font-bold text-lg mb-3">
                {article.title}
              </h3>
              <Link
                href={`/articles/${article._id}`}
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
              >
                قراءة
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;