import React, { useState } from "react";
import { UsersContext } from '@/contexts/UsersContext'

export const UsersContextProvider = props => {
  const setUsername = username => setState({ ...state, username })

  const setShowChat = value => setState({ ...state, showChat: value })

  const updateUsers = listOfUsers => setState({ ...state, listOfUsers })

  const initialState = {
    username: '',
    showChat: false,
    listOfUsers: [],
  }

  const [state, setState] = useState(initialState)

  const valueProvider = {
    state,
    setUsername,
    setShowChat,
    updateUsers,
  }

  return (
    <UsersContext.Provider value={valueProvider}>
      {props.children}
    </UsersContext.Provider>
  )
}