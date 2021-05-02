import React, { createContext, useState, ReactNode } from 'react'
import { UserContextProps } from 'types'

interface Props {
  children: ReactNode
}

export const UserContext = createContext<UserContextProps | null>(
  null
)

const Provider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

export const UserProvider = (props: Props) => {
  const { children } = props

  const [users, setUsers] = useState([
    {
      name: 'macbeth',
      color: 'red'
    }
  ])

  const setUserColor = (name: string, color: string) => {
    console.log('Set user color')
  }

  const getUserColor = (name: string) => {
    return 'color'
  }

  return (
    <Provider value={{ users, setUserColor, getUserColor }}>
      {children}
    </Provider>
  )
}
