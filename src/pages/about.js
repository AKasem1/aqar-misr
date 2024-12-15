import { Button } from '@/components/UI/button';
import Image from 'next/image';
import Link from "next/link"

export default function About() {
  return (
    <div className="flex flex-col items-center p-8 space-y-8 min-h-[calc(100vh-185px)]" dir="rtl">
      <h1 className="text-3xl font-bold text-center">عقار مصر</h1>
      <div className="border rounded-lg p-6 max-w-4xl bg-gray-50 shadow-lg">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <Image
              src="https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="عقار مصر"
              width={300}
              height={300}
              className="rounded-lg shadow-md ml-20"
            />
          </div>
          <div className="text-lg leading-7 text-gray-800">
            <p>
              مرحباً بكم في <span className="font-bold">عقار مصر</span>، منصة
              رائدة متخصصة في تقديم حلول بحث عقارية شاملة. نساعد العملاء في
              استكشاف خياراتهم من العقارات السكنية والتجارية بأفضل الأسعار وأعلى
              جودة.
            </p>
            <p className="mt-4">
              فريقنا من الخبراء يضمن تجربة فريدة وسهلة في إيجاد العقار المثالي
              الذي يناسب احتياجاتك. بفضل التكنولوجيا الحديثة وطرق البحث المتقدمة،
              نقدم لك خيارات متنوعة موثوقة لتلبية كل توقعاتك.
            </p>
            <Link href="/auth">
                <Button className="mt-4 bg-teal-900 text-white">انضم إلينا</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
