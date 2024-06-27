import React from 'react'

const Result = ({ result }) => {
  console.log(result);
  return (
    <div className='mt-4 flex flex-col gap-6 max-w-[420px]'>
      {result?.result.map((item, index: number) => (
        <div
          key={index}
          className='truncate flex items-center justify-between gap-4 border-2 border-blue-600 p-2 rounded-md w-[80%] shadow-md'
        >
          <p className='font-normal text-lg'>{item[0]}</p>
          <p className='font-bold text-lg text-red-500'>{item[1]}</p>
        </div>
      ))}
    </div>
  )
}

export default Result
