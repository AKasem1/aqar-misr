import React from 'react'
import { Check } from 'lucide-react'

const AboutUs = () => {
  return (
    <div className='w-full bg-teal-800 px-6 py-20 grid md:grid-cols-2 md:px-20 md:gap-64'>
        
        {/* Images Section */}
        <div className='hidden md:flex gap-6'>
            <img className='h-1/2' src="about_image_1.png"/>
            <img className='h-1/2 mt-32' src="about_image_2.png"/>
        </div>
        
        {/* Text Section */}
        <div className='h-full flex flex-col items-center justify-center gap-6 text-white'>
            <h1 className='text-3xl text-amber-200 font-semibold'>عن شركة عقار مصر</h1>
            <p className='text-right'>نعمل في عقارات مصر على أن نكون المؤسسة الرائدة في سوق العقارات لذلك نركز على تلبية احتياجات عملائنا .</p>

            {/* علامات الصح الغريبة دي */}
            <div className='flex items-center flex-row-reverse gap-4 self-end'>
                <Check className='p-1 bg-amber-200 aspect-square rounded-full text-black'/>
                <p>تزويد عملائنا بكافة الخدمات الإستشارية في العقارات</p>
            </div>

            <div className='flex items-center flex-row-reverse gap-4 self-end'>
                <Check className='p-1 bg-amber-200 aspect-square rounded-full text-black'/>
                <p>تطوير وتحديث فكرة التسويق العقاري داخل السوق المصري</p>
            </div>

            <button className='bg-transparent px-7 py-3 font-semibold border-amber-200 border rounded-xl self-start hover:bg-amber-200 hover:text-black transition-colors'>
                ابدأ الأن
            </button>
        </div>
    </div>
  )
}

export default AboutUs