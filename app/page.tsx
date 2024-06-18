import AppBar from '@/app/components/AppBar'
import { Button } from '@mantine/core'

export default function Home() {
  return (
    <main className='bg-main-gray flex flex-col min-h-screen text-black'>
      <AppBar />
      <div className='grid grid-cols-3 gap-4'>
        <div className='bg-main-cyan min-h-screen'>
          <p className='m-4 text-[4rem] font-bold font-mono'>EURO 2024</p>
          <p className='m-4 text-[1.5rem] font-normal font-mono'>Youtube Video Comment Sentiment Explorer</p>
          <p className='ml-4 mt-2 font-bold'>By: John Pham</p>
        </div>
      </div>
    </main>
  )
}
