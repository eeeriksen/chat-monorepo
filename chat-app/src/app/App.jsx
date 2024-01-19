import React, { useContext, useState } from 'react'
import { Layout } from '@/components/Layout/Layout'
import { Welcome } from '@/components/Welcome/Welcome'
import { UsersContext } from '@/contexts/UsersContext'
import { UsersContextProvider } from '@/providers/UsersContextProvider'
import { SocketContextProvider } from '@/providers/SocketContextProvider'
import css from './app.module.css'

export function App() {
  return (
    <UsersContextProvider>
      <SocketContextProvider>
        <Layout />
      </SocketContextProvider>
    </UsersContextProvider>
  )
}