import React, { createContext, useState, ReactNode } from 'react'
import { PersonaeContextProps, PersonaColor } from 'types'

interface Props {
  children: ReactNode
}

export const PersonaeContext = createContext<PersonaeContextProps | null>(
  null
)

export const PersonaeConsumer = PersonaeContext.Consumer

const Provider = PersonaeContext.Provider

export const PersonaeProvider = (props: Props) => {
  const { children } = props

  const [personae, setPersonae] = useState<PersonaColor[]>([])

  const setPersonaColor = (name: string, color: string) => {
    const personaIndex = personae.findIndex(
      (persona) => persona.name === name
    )

    if (personaIndex !== -1) {
      const newPersonae = [...personae]
      newPersonae[personaIndex].color = color

      setPersonae(newPersonae)
    }
  }

  const getPersonaColor = (name: string) => {
    const persona = personae.find((persona) =>
      persona.name.includes(name)
    )

    if (persona) return persona.color

    return null
  }

  return (
    <Provider
      value={{
        personae,
        setPersonaColor,
        getPersonaColor,
        setPersonae
      }}
    >
      {children}
    </Provider>
  )
}
