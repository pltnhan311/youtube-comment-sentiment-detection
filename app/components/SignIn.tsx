'use client'
import { Button } from '@mantine/core'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const SignInButton = () => {
  const { data: session } = useSession()
  if (session && session.user) {
    return (
      <div className='absolute right-4 top-4'>
        <Button color='orange' onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    )
  }
  return (
    <div className='absolute right-4 top-4'>
      <Button color='lime' onClick={() => signIn()}>
        Sign in
      </Button>
    </div>
  )
}

export default SignInButton
