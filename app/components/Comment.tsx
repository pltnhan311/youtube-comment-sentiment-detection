import React from 'react'

const Comments = ({ comments, result }) => {
  return (
    <div className='mt-4'>
      {result?.comment_with_emotion.map((comment, index) => (
        <div
          key={index}
          className='my-6 flex flex-col items-start gap-4 bg-gradient-to-br from-main-pink border-2 border-blue-500 rounded-md w-[80%] shadow-md p-4'
        >
          <p className='overflow-auto text-over font-medium text-blue-800 text-lg'>{comment[0]}</p>
          <div className='flex gap-4 items-start'>
            {comment[1].map((emotion, index) => (
              <div key={index} className='flex flex-col gap-2'>
                <p className='text-sm font-medium'>{emotion.name}</p>
                <p className='text-sm flex items-center justify-center font-semibold bg-white rounded-md p-1 w-[48px] bg-gradient-to-tl from-[#fff79a] to-[#5cd746]'>
                  {parseFloat(emotion.score).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments
