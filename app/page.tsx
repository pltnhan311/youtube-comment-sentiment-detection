'use client'

import { getChannelDetail, getComment, getVideoDetail } from '@/app/action'
import AppBar from '@/app/components/AppBar'
import { ChannelHeader, VideoHeader } from '@/app/components/ChannelHeader'
import Comments from '@/app/components/Comment'
import Loading from '@/app/components/Loading'
import Result from '@/app/components/Result'
import { Button, Image, Input, LoadingOverlay } from '@mantine/core'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Home() {
  const { data: session } = useSession()
  const [videoUrl, setVideoUrl] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [result, setResult] = useState(null)
  const [channel, setChannel] = useState({})
  const [video, setVideo] = useState({})

  const filterText = (inputText: string) => {
    // Remove emojis
    const noEmojis = inputText.replace(/[\u{1F600}-\u{1F6FF}]/gu, '')
    // Remove special characters
    const noSpecialChars = noEmojis.replace(/[^\w\s]/gi, '')
    return noSpecialChars
  }

  const anazlyzeComments = async (comments) => {
    try {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment_data: comments })
      })
      const result = await data.json()
      return result
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
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
      console.log(filtered_comments)
      if (filtered_comments.length > 0) {
        const result = await anazlyzeComments(filtered_comments)
        console.log(result)
        setResult(result)
      }
      setVideoUrl('')
      setLoading(false)
    } else {
      window.alert('Please login to continue')
    }
  }

  return (
    <main className='flex flex-col min-h-screen text-gray-800'>
      <AppBar />
      <div className='grid grid-cols-3'>
        <div className='bg-[#ffffff] min-h-screen'>
          <p className='m-4 text-[2rem] font-medium bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent'>
            Sentiment Analysis of YouTube Comments
          </p>
          <p className='m-4 text-[1.2rem] leading-normal text-gray-700'>
            Description: identify positive or negative sentiments, such as satisfaction, frustration, pleasant surprise,
            etc. from viewers.
          </p>
          <form onSubmit={handleSubmit}>
            <p className='ml-4 mt-12 text-[1.25rem]'>Paste Youtube Video URL</p>
            <div className='m-4 space-y-4'>
              <Input
                size='lg'
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                value={videoUrl}
              />
              {isLoading ? (
                <Button color='gray' disabled>
                  Loading...
                </Button>
              ) : (
                <Button type='submit' color='red'>
                  Check now
                </Button>
              )}
            </div>
          </form>
        </div>
        <div className='bg-gradient-to-r from-orange-100 to-rose-200 min-h-screen col-span-2'>
          {isLoading ? (
            'Loading...'
          ) : (
            <div className='grid grid-cols-3 border-2 border-indigo-400 mt-20 mx-10 rounded-md p-2 bg-white/30 backdrop-blur-md space-x-10'>
              <div className='col-span-2 ml-10'>
                <ChannelHeader channel={channel} />
                <VideoHeader video={video} />
              </div>
              <div className='my-10 w-full'>
                <p className='font-bold text-xl'>Result</p>
                <Result result={result} />
              </div>
            </div>
          )}
          {comments.length > 0 && !isLoading && (
            <p className='ml-12 mt-8 font-medium text-[22px] bg-gradient-to-r from-pink-500  via-red-500 to-yellow-500 bg-clip-text text-transparent'>
              List comments from Youtube
            </p>
          )}
          <div className='ml-12 mt-5 max-h-[500px] overflow-auto shadow-md'>
            <Comments comments={comments} result={result} />
          </div>
        </div>
      </div>
    </main>
  )
}
