import React from 'react'

const PropertyAttribute = ({iconSrc, value, className}) => {
  return (
    <div className={'flex px-3 py-1 gap-4 border rounded-full ' + className}>
        <img src={iconSrc} alt="property attribute icon" />
        <p className='text-slate-600 text-sm'>{value}</p>
    </div>
  )
}

export default PropertyAttribute