import React, { createContext, useState, ReactNode } from 'react'
import { UserContextProps } from 'types'

interface Props {
  children: ReactNode
}

interface PersonaColor {
  name: string
  color: string
}

export const UserContext = createContext<UserContextProps | null>(
  null
)

const Provider = UserContext.Provider
export const UserConsumer = UserContext.Consumer

export const UserProvider = (props: Props) => {
  const { children } = props

  const [users, setUsers] = useState<PersonaColor[]>([
    { name: 'DUNCAN, king of Scotland.', color: '#64DC8D' },
    { name: 'MALCOLM', color: '#985E30' },
    { name: 'DONALBAIN', color: '#569A60' },
    { name: 'MACBETH', color: '#E9B307' },
    { name: 'BANQUO', color: '#E12D90' },
    { name: 'MACDUFF', color: '#BE5912' },
    { name: 'LENNOX', color: '#015153' },
    { name: 'ROSS', color: '#D02341' },
    { name: 'MENTEITH', color: '#BC5B2F' },
    { name: 'ANGUS', color: '#8FCC13' },
    { name: 'CAITHNESS', color: '#34A0C4' },
    { name: 'FLEANCE, son to Banquo.', color: '#B07AA5' },
    {
      name:
        'SIWARD, Earl of Northumberland, general of the English forces.',
      color: '#C60254'
    },
    { name: 'YOUNG SIWARD, his son.', color: '#02A0F1' },
    {
      name: 'SEYTON, an officer attending on Macbeth.',
      color: '#07BD9C'
    },
    { name: 'Boy, son to Macduff. ', color: '#2B99F6' },
    { name: 'An English Doctor. ', color: '#388ED8' },
    { name: 'A Scotch Doctor. ', color: '#154776' },
    { name: 'A Soldier.', color: '#8A5844' },
    { name: 'A Porter.', color: '#B9148E' },
    { name: 'An Old Man.', color: '#18FCCF' },
    { name: 'LADY MACBETH', color: '#B51108' },
    { name: 'LADY MACDUFF', color: '#9FBAAB' },
    {
      name: 'Gentlewoman attending on Lady Macbeth. ',
      color: '#93DB2A'
    },
    { name: 'HECATE', color: '#0D366E' },
    { name: 'Three Witches.', color: '#5A6671' },
    { name: 'Apparitions.', color: '#8C0FCB' },
    {
      name:
        'Lords, Gentlemen, Officers, Soldiers, Murderers, Attendants, and Messengers. ',
      color: '#CC505A'
    }
  ])

  const setUserColor = (name: string, color: string) => {
    const userIndex = users.findIndex((user) => user.name === name)

    if (userIndex !== -1) {
      const newUsers = [...users]

      newUsers[userIndex].color = color

      setUsers(newUsers)
    }
  }

  const getUserColor = (name: string) => {
    const user = users.find((user) => user.name.includes(name))

    if (user) return user.color

    return null
  }

  return (
    <Provider value={{ users, setUserColor, getUserColor }}>
      {children}
    </Provider>
  )
}
