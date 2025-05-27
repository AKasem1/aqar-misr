import Head from "next/head";
import Hero from "../components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Steps from "@/components/sections/Steps";
import Categories from "@/components/sections/Categories";
import Newsletter from "@/components/sections/Newsletter";
import Properties from "@/components/sections/Properties";
import AboutUs from "@/components/sections/AboutUs";
import { useSelector } from "react-redux";

export default function Home({ properties }) {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = user? true: false;
  return (
    <>
      <Head>
        <title>Aqar Misr | افضل موقع عقارات</title>
        <meta name="description" content="موقع عقار مصر يعرض كل ماهو جديد في عالم العقارات في مصر بشكل عام والعاصمة الادارية بشكل خاص" />
      </Head>
      <main>
        <Hero/>
        <Stats/>
        <Properties properties={properties}/>
        <Categories/>
        <Steps/>
        <AboutUs/>
        <Newsletter/>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    // Using absolute URL to ensure it works in SSR
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const host = process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    
    const response = await fetch(`${baseUrl}/api/property/getProperties`);
    const data = await response.json();

    return {
      props: {
        properties: data.data || [],
      },
    };
  } catch (error) {
    console.error('Error fetching properties:', error);
    return {
      props: {
        properties: [],
      },
    };
  }
}
