import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Article = () => {
  const router = useRouter();
  const { articleId } = router.query;
  const [article, setArticle] = useState({});

  useEffect(() => {
    if (!articleId) return; // Wait until `articleId` is available
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/article/getArticle`, {
          params: { articleId },
        });

        if (response && response.status === 200) {
          const data = response.data;
          console.log("data: ", data)
          setArticle(data.data || {});
        }
      } catch (error) {
        console.error('Error fetching Article:', error);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (!article || !article.title) {
    return (
      <div className="rtl px-6 py-4">
        <p className="text-red-500">المقال غير موجود.</p>
        <button
          onClick={() => window.history.back()}
          className="bg-teal-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-teal-600 transition-colors"
        >
          العودة
        </button>
      </div>
    );
  }

  return (
    <div className="rtl px-6 py-4 space-y-6 my-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-center">
        <img
          src={article.image}
          alt={article.title}
          className="w-full max-w-md h-auto object-contain rounded-md mb-6"
        />
      </div>
        <h1 className="text-teal-600 font-bold text-2xl mb-4 text-center">{article.title}</h1>
        {article.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-gray-700 leading-relaxed mb-4 text-right" dir='rtl'>
            {paragraph}
          </p>
        ))}
      </div>
      <button
        onClick={() => window.history.back()}
        className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
      >
        العودة
      </button>
    </div>
  );
};



// export async function getServerSideProps (context) {
//   const { articleId } = context.params;

//   try {
//     const response = await axios.get(`/api/article/getArticle`, {
//       params: { articleId },
//     });

//     const data = await response.json();

//     console.log("data: ", data)

//     return {
//       props: {
//         article: data.data || null,
//       },
//       revalidate: 1,
//     };
//   } catch (error) {
//     console.error('Error fetching article:', error);
//     return {
//       props: {
//         article: null,
//       },
//     };
//   }
// }

export default Article;
