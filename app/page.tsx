'use client'

import { getChannelDetail, getComment, getVideoDetail } from '@/app/action'
import AppBar from '@/app/components/AppBar'
import { ChannelHeader, VideoHeader } from '@/app/components/ChannelHeader'
import Loading from '@/app/components/Loading'
import { Button, Input, LoadingOverlay } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Home() {
  const { data: session } = useSession()
  const [videoUrl, setVideoUrl] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [channel, setChannel] = useState({})
  const [video, setVideo] = useState({})

  const filterText = (inputText: string) => {
    // Remove emojis
    const noEmojis = inputText.replace(/[\u{1F600}-\u{1F6FF}]/gu, '')
    // Remove special characters
    const noSpecialChars = noEmojis.replace(/[^\w\s]/gi, '')
    return noSpecialChars
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!videoUrl.includes('youtube.com/watch?v=')) {
      return
    }
    const videoId = videoUrl.split('v=')[1].split('&')[0]
    console.log(videoId)
    if (session) {
      setLoading(true)
      const data = await getComment(videoId)
      const channelId = data[0].channelId
      const videoData = await getVideoDetail(videoId)
      const channelData = await getChannelDetail(channelId)
      setChannel(channelData)
      setVideo(videoData)
      const comment = data.map((item) => item.topLevelComment.snippet.textDisplay)
      let filtered_comments = comment.map((item) => filterText(item))
      filtered_comments = filtered_comments.filter((item) => item !== '')
      setComments(filtered_comments)
      setVideoUrl('')
      setLoading(false)
    } else {
      window.alert('Please login to continue')
    }
  }

  return (
    <main className='bg-white flex flex-col min-h-screen text-black'>
      <AppBar />
      <div className='grid grid-cols-3 gap-4'>
        <div className='bg-white min-h-screen'>
          <p className='m-4 text-[4rem] font-bold font-mono'>YTB 2024</p>
          <p className='m-4 text-[1.5rem] font-normal font-mono'>Youtube Video Comment Sentiment Explorer</p>
          <p className='ml-4 mt-2 font-bold'>By: John Pham</p>
          <form onSubmit={handleSubmit}>
            <p className='ml-4 mt-12 text-[1.25rem]'>Paste Youtube Video URL</p>
            <div className='m-4 space-y-4'>
              <Input
                size='md'
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                value={videoUrl}
              />
              {isLoading ? (
                <Button color='gray' disabled>
                  <LoadingOverlay />
                </Button>
              ) : (
                <Button type='submit' color='indigo'>
                  Lets check
                </Button>
              )}
            </div>
          </form>
        </div>
        <div className='min-h-screen col-span-2'>
          {isLoading ? (
            <div>...loading</div>
          ) : (
            <div className='grid grid-cols-3 border-2 border-indigo-400 mt-16 ml-12 mr-24 rounded-md p-4 bg-white/30 backdrop-blur-md'>
              <div className='col-span-2'>
                <ChannelHeader channel={channel} />
                <VideoHeader video={video} />
              </div>
              <div className='mt-12'>
                <p className='font-mono font-bold text-[1.25rem]'> Result </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
