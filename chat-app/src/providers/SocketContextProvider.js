import React from 'react'
import { Socket } from '@/services/socketConnection'
import { SocketContext } from '@/contexts/SocketContext'

export const SocketContextProvider = props => {
  return (
    <SocketContext.Provider value={{ Socket }}>
      {props.children}
    </SocketContext.Provider>
  )
}
