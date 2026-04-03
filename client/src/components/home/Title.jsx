import React from 'react'

const Title = ({title,decription}) => {
  return (
    <div className='text-center mt-6 text-slate-700'>
        <h2 className='text-3xl font-bold'>{title}</h2>
        <p className='max-sm max-w-2xl mt-4 text-slate-500'>{decription}</p>
    </div>
  )
}

export default Title
