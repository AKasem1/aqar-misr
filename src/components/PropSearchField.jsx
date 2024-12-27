import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

const PropSearchField = () => {
  const [query, setQuery] = useState("");
  const [properties, setProperties] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setProperties([]);
      return;
    }

    try {
      const response = await axios.get(`/api/property/searchProperties`, {
        params: { query: value },
      });
      const data = await response.data.data;
      setProperties(data);
      setShowResults(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigate = (id) => {
    router.push(`/property/${id}`);
    setShowResults(false);
  };
  
  return (
    <div className="relative w-3/4 sm:w-1/2 mx-auto">
      <div className="flex items-center pl-4 pr-1 py-1 bg-white shadow border-2 rounded-full focus-within:border-sky-600 gap-2">
        <input
          className="focus:outline-none w-full bg-transparent text-right"
          type="text"
          placeholder="ابحث عن مدينة عقارك"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowResults(true)}
        />
        <button className="bg-amber-200 px-4 py-2 rounded-full hover:bg-orange-300 active:bg-orange-400 transition-colors">
          <img
            className="w-4 h-4"
            src="search_icon.svg"
            alt="search property icon"
          />
        </button>
      </div>

      {showResults && properties.length > 0 && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 w-full mt-2 bg-white shadow-lg rounded-lg p-4 z-10"
          dir="rtl"
        >
          <h4 className="font-bold text-lg mb-3">نتائج البحث:</h4>
          <ul className="space-y-3">
            {properties.map((property) => (
              <li
                key={property._id}
                onClick={() => handleNavigate(property._id)}
                className="flex items-center bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition gap-2 cursor-pointer"
              >
                <img
                  src={property.image}
                  alt={property.propertyName}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-medium">{property.propertyName}</p>
                  <p className="text-sm text-gray-500">{property.city}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PropSearchField;
