import React from 'react'

/**
 * A section that displays the categories of properties on the website.
 *
 * This component displays a section with a heading, a horizontal line, a
 * paragraph, and a grid of four property categories. Each category is
 * represented by an image and a heading.
 *
 * @returns {React.ReactElement} A section element that displays the categories.
 */

const Categories = () => {
  return (
    <div className='w-full p-16 flex flex-col items-center justify-center bg-teal-900 space-y-6'>
        <h1 className='text-3xl font-bold text-amber-200'>عقاراتنا</h1>
        
        <hr className='w-1/2 border-white'></hr>

        <p className='text-amber-200'>بيع وايجار</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
            <div className='group relative'>
                <img className='rounded-2xl h-64  transition-all' src="houses_category_image.png" alt="houses category image" />
                <p className='text-xl font-semibold absolute top-4 right-4  transition-all'>شقق</p>
            </div>
            <div className='group relative'>
                <img className='rounded-2xl h-64  transition-all' src="offices_category_image.png" alt="offices category image" />
                <p className='text-xl font-semibold absolute top-4 right-4  transition-all'>مكاتب</p>
            </div>
            <div className='group relative'>
                <img className='rounded-2xl h-64  transition-all' src="villas_category_image.png" alt="villas category image" />
                <p className='text-xl font-semibold absolute top-4 right-4  transition-all'>فيلات</p>
            </div>
            <div className='group relative'>
                <img className='rounded-2xl h-64  transition-all' src="shaleh_category_image.png" alt="shalehs category image" />
                <p className='text-xl font-semibold absolute top-4 right-4  transition-all'>شاليهات</p>
            </div>
        </div>
    </div>
  )
}

export default Categories