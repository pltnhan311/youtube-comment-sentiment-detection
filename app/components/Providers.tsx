'use client'

import { SessionProvider } from "next-auth/react"

type IProps = {
  children: React.ReactNode
}

const Providers = (props: IProps) => {
  return <SessionProvider>{props.children}</SessionProvider>
}

export default Providers