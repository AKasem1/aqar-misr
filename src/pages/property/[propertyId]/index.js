import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { AirVent, ArrowLeft, ArrowRight, ArrowsUpFromLine, Bath, Bed, Camera, CookingPot, Heater, Map, MapPin, Receipt, RulerIcon, Sofa, Trees } from 'lucide-react'
import { Button } from '@/components/UI/button'
import Image from 'next/image'
import { MongoClient, ObjectId } from 'mongodb';

const index = ({property}) => {

    const router = useRouter()

    if (!property) {
        console.log(property)
        return (
            <div>
                <h1>Property not found</h1>
                <Button onClick={() => router.push('/')}>Go Back to Home</Button>
            </div>
        );
    }

    console.log("property: ", property)

    return (
        <>
            <Head>
                <title>{`Aqar Misr | Property ${property.propertyName}`}</title>
                <meta name="description" content="" />
            </Head>
            <div className='m-6 p-10 bg-gray-50 rounded-lg shadow-lg'>
                <div className='grid grid-cols-1 lg:grid-cols-2 justify-between gap-10'>

                    <Image className='rounded-lg max-h-[500px] mx-auto' src={property.propertyImage || "https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} alt={property.propertyName} width={500} height={500} loading='eager' />


                    <div dir='rtl' className='space-y-5'>
                        <Button className="bg-teal-900 hover:bg-teal-800"
                          onClick={() => {
                            window.open(process.env.NEXT_PUBLIC_WHATSAPP_URL, "_blank");
                            // window.location.href = process.env.WHATSAPP_URL;
                          }}
                        >
                            <ArrowRight />اشتري العقار الان
                        </Button>

                        <h1 className='text-3xl'>{property.propertyName}</h1>

                        <p className='text-green-500'>يبدا من{property.currentPrice} ج</p>
                        <div className='grid grid-cols-2 lg:flex items-center gap-4'>
                            <div className='flex items-center gap-2'>
                                <Bed className='py-px text-gray-600' />
                                <p className='text-gray-600'>{property.rooms} غرف</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Bath className='py-px text-gray-600' />
                                <p className='text-gray-600'>{property.bathrooms} حمام</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <RulerIcon className='py-px text-gray-600' />
                                <p className='text-gray-600'>{property.propertyArea} متر</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <MapPin className='py-px text-gray-600' />
                                <p className='text-gray-600'>{property.location}</p>
                            </div>
                        </div>

                        <hr />
                        <p className='text-gray-600'>{property.propertyDescription}</p>
                        <hr />

                        {/* Property Features */}
                        {console.log(property)}
                        <h1 className='text-2xl'>مميزات العقار</h1>
                        <div className='grid grid-cols-3 gap-4'>
                            {property.features.hasKitchen &&
                                (<div className='flex items-center gap-2'>
                                    <CookingPot className='py-px text-gray-600' />
                                    <p className='text-gray-600'>مطبخ</p>
                                </div>)}

                            {property.features.hasGarden &&
                                (<div className='flex items-center gap-2'>
                                    <Trees className='py-px text-gray-600' />
                                    <p className='text-gray-600'>جنينه</p>
                                </div>)}

                            {property.features.hasElevator &&
                                (<div className='flex items-center gap-2'>
                                    <ArrowsUpFromLine className='py-px text-gray-600' />
                                    <p className='text-gray-600'>مصعد</p>
                                </div>)}

                            {property.features.hasCamera &&
                                (<div className='flex items-center gap-2'>
                                    <Camera className='py-px text-gray-600' />
                                    <p className='text-gray-600'>كاميرات</p>
                                </div>)}

                            {property.features.hasMeters &&
                                (<div className='flex items-center gap-2'>
                                    <Receipt className='py-px text-gray-600' />
                                    <p className='text-gray-600'>متور</p>
                                </div>)}

                            {property.features.hasHeating &&
                                (<div className='flex items-center gap-2'>
                                    <Heater className='py-px text-gray-600' />
                                    <p className='text-gray-600'>سخان</p>
                                </div>)}

                            {property.features.hasAC &&
                                (<div className='flex items-center gap-2'>
                                    <AirVent className='py-px text-gray-600' />
                                    <p className='text-gray-600'>تكيف</p>
                                </div>)}

                            {property.features.isFurnished &&
                                (<div className='flex items-center gap-2'>
                                    <Sofa className='py-px text-gray-600' />
                                    <p className='text-gray-600'>مفروش</p>
                                </div>)}
                        </div>

                        <hr />

                        {/* Property Location */}
                        <h1 className='text-2xl'>موقع العقار</h1>
                        <div className='flex items-center gap-2'>
                            <MapPin className='py-px text-gray-600' />
                            <p className='text-gray-600'>{property.location}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Map className='py-px text-gray-600' />
                            <a className='text-sky-500' href='' target='_blank' rel='noreferrer'>
                                Google Map Location
                                <ArrowLeft className='inline-block' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths(){
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db();
    const propertiesCollection = db.collection('properties');
    const properties = await propertiesCollection.find({},{_id: 1}).toArray();
    if (!properties) {
        return {
          notFound: true,
        };
      }
    client.close();
    return {
        fallback: 'blocking',
        paths: properties.map(property => ({
            params: {propertyId: property._id.toString()}
        }))
    }
}

export async function getStaticProps(context) {
    const { propertyId } = context.params;
  
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db();
    const propertiesCollection = db.collection("properties");
  
    const property = await propertiesCollection.findOne({ _id: new ObjectId(propertyId) });
  
    if (!property) {
      return {
        notFound: true,
      };
    }
  
    client.close();
  
    const formattedProperty = {
      id: property._id.toString(),
      propertyName: property.propertyName,
      propertyType: property.propertyType,
      propertyImage: property.image,
      propertyDescription: property.propertyDescription,
      addedBy: property.addedBy?.toString() || null,
      city: property.city,
      contractType: property.contractType,
      location: property.location,
      currentPrice: property.currentPrice,
      propertyArea: property.propertyArea,
      rooms: property.rooms,
      bathrooms: property.bathrooms,
      features: {
        hasKitchen: property.hasKitchen || false,
        hasGarden: property.hasGarden || false,
        hasElevator: property.hasElevator || false,
        hasCameras: property.hasCameras || false,
        hasMeters: property.hasMeters || false,
        hasHeating: property.hasHeating || false,
        hasAC: property.hasAC || false,
        isFurnished: property.isFurnished || false,
      },
      accepted: property.accepted || "pending",
      createdAt: property.createdAt?.toISOString() || null,
      updatedAt: property.updatedAt?.toISOString() || null,
    };
  
    return {
      props: {
        property: formattedProperty,
      },
      revalidate: 1,
    };
  }

export default index
