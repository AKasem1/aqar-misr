import PropertyCard from '@/components/PropertyCard';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { setProperties, filterProperties } from '@/redux/slices/propertySlice';

const Index = () => {
  const properties = useSelector((state) => state.properties.properties);
  const [selectedType, setSelectedType] = useState('');
  const [selectedContract, setSelectedContract] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const getProperties = async () => {
      const response = await axios
        .get('/api/property/getProperties/')
        .then((data) => data.data.data)
        .catch((err) => console.log(err));
      console.log('Properties: ', response);
      dispatch(setProperties(response || []));
    };
    getProperties();
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProperties({ propertyType: selectedType, contractType: selectedContract }));
  }, [selectedType, selectedContract, dispatch]);

  return (
    <>
      <Head>
        <title>Aqar Misr | رؤية العقارات</title>
      </Head>
      <div className="relative w-full flex items-center mt-10">
        <Link
          href="/"
          className="absolute left-5 -top-10 sm:-top-0 text-blue-500 inline-flex items-center z-0"
        >
          <ArrowLeft className="p-1" />
          رجوع للصفحة الرئيسية
        </Link>
        <h1 className="w-full text-center text-3xl font-semibold text-nowrap">
          عقاراتنا
        </h1>
      </div>

      <div className="p-6 flex flex-row flex-wrap gap-4 justify-center items-center">
        <div className="flex flex-row items-center gap-2">
          <select
            className="p-2 border rounded-lg"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">الكل</option>
            <option value="شقة">شقة</option>
            <option value="فيلا">فيلا</option>
            <option value="شاليه">شاليه</option>
            <option value="مكتب">مكتب</option>
          </select>
          <label className="font-semibold text-teal-900">نوع العقار</label>
        </div>

        <div className="flex flex-row items-center gap-2">
          <select
            className="p-2 border rounded-lg"
            value={selectedContract}
            onChange={(e) => setSelectedContract(e.target.value)}
          >
            <option value="">الكل</option>
            <option value="إيجار">إيجار</option>
            <option value="تمليك">تمليك</option>
          </select>
          <label className="font-semibold text-teal-900">نوع العقد</label>
        </div>
      </div>

      <div className="p-6 min-h-screen responsive-grid place-items-center justify-center">
        {properties ? (
          properties.map((property) => (
            <PropertyCard
              key={property._id}
              id={property._id}
              propName={property.propertyName}
              propImage={property.image}
              propCity={property.city}
              propAttributes={property.attributes}
              propOwnerName={property.seller.name}
              propOwnerPhone={property.seller.phone}
            />
          ))
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </>
  );
};

export default Index;