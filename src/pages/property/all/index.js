import PropertyCard from '@/components/PropertyCard';
import axios from 'axios';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const index = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const getProperties = async () => {
            const response = await axios
                .get("/api/property/getProperties/")
                .then((data) => data.data.data)
                .catch((err) => console.log(err));
            setProperties(response);
        };
        getProperties();
    }, []);

    return (
        <>
            <Head>
                <title>Aqar Misr | رؤية العقارات</title>
            </Head>
            <div className="relative w-full flex items-center mt-10">
                <Link
                    href="/"
                    className="absolute left-5 -top-10 sm:-top-0 text-blue-500 inline-flex items-center z-0">
                    <ArrowLeft className="p-1" />
                    رجوع للصفحة الرئيسية
                </Link>
                <h1 className="w-full text-center text-3xl font-semibold text-nowrap">
                    عقاراتنا
                </h1>
            </div>
            <div className='p-6 min-h-screen responsive-grid place-items-center justify-center'>
                {properties && properties.map((property) => {
                    return (
                        <PropertyCard
                            key={property._id}
                            propName={property.propertyName}
                            propImage={property.image}
                            propLocation={property.location}
                            propAttributes={property.attributes}
                            propOwnerPhone={property.addedBy.phone}
                            propOwnerWhatsApp={property.addedBy.whatsapp}
                        />
                    );
                })}
            </div>
        </>
    )
}

export default index