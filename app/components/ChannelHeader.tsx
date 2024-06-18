import { Image } from '@mantine/core'
import React from 'react'

export const ChannelHeader = ({ channel }) => {
  return (
    <div className='mt-12 ml-12 flex items-center gap-4 border-2 border-indigo-500 p-2 rounded-md w-[70%] shadow-md'>
      <Image
        radius={'sm'}
        src={channel?.thumbnails?.default.url}
        alt={channel?.title ?? 'title'}
        className='w-12 h-12 object-contain rounded-[50%]'
        fallbackSrc='https://placehold.co/600x400?text=Placeholder'
      />
      <p className='font-bold text-[1.25rem]'>{channel?.title}</p>
    </div>
  )
}

export const VideoHeader = ({ video }) => {
  return (
    <div className='mt-12 ml-12 flex-col justify-center gap-4 rounded-md'>
      <Image
        radius={'sm'}
        src={video?.thumbnails?.maxres.url}
        alt={video?.title ?? 'title'}
        className='object-cover w-[420px] rounded-md'
        fallbackSrc='https://placehold.co/600x400?text=Placeholder'
      />
      <p className='mt-4 font-bold text-[1.25rem]'>{video?.title}</p>
    </div>
  )
}
