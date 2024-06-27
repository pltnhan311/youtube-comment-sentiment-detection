import { Image } from '@mantine/core'
import React from 'react'

export const ChannelHeader = ({ channel }) => {
  return (
    <div className='my-7 flex items-center gap-4 border-2 border-indigo-500 p-2 rounded-md w-[70%] shadow-md'>
      <Image
        radius={'sm'}
        src={channel?.thumbnails?.default.url}
        alt={'video thumbnail'}
        className='w-12 h-12 object-contain rounded-[50%]'
        fallbackSrc='https://placehold.co/600x400?text=Placeholder'
      />
      <p className='font-medium text-xl'>{channel?.title}</p>
    </div>
  )
}

export const VideoHeader = ({ video }) => {
  return (
    <div className='mb-7 flex-col justify-center gap-4 rounded-md'>
      <Image
        radius={'sm'}
        src={video?.thumbnails?.maxres.url}
        alt={video?.title ?? 'title'}
        className='object-cover w-[420px] rounded-md'
        fallbackSrc='https://placehold.co/600x400?text=Placeholder'
      />
      <p className='mt-4 font-medium text-[1.25rem]'>{video?.title}</p>
    </div>
  )
}
