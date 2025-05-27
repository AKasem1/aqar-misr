import Head from "next/head";
import Hero from "../components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Steps from "@/components/sections/Steps";
import Categories from "@/components/sections/Categories";
import Newsletter from "@/components/sections/Newsletter";
import Properties from "@/components/sections/Properties";
import AboutUs from "@/components/sections/AboutUs";
import { useSelector } from "react-redux";

export default function Home() {
  return (
    <>
      <Head>
        <title>Aqar Misr | افضل موقع عقارات</title>
        <meta name="description" content="موقع عقار مصر يعرض كل ماهو جديد في عالم العقارات في مصر بشكل عام والعاصمة الادارية بشكل خاص" />
      </Head>
      <main>
        <Hero/>
        <Stats/>
        <Properties/>
        <Categories/>
        <Steps/>
        <AboutUs/>
        <Newsletter/>
      </main>
    </>
  );
}
