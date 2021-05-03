import React, {
  createContext,
  useState,
  ReactNode,
  useEffect
} from 'react'
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

  /*
   * State
   */
  const [personae, setNewPersonae] = useState<PersonaColor[]>([])
  const [playId, setPlayId] = useState<string>()

  /*
   * Hooks
   */
  useEffect(() => {
    const personae = localStorage.getItem(`play-${playId}`)

    if (personae) {
      setNewPersonae(JSON.parse(personae))
    } else {
      setNewPersonae([])
    }
  }, [playId])

  /*
   * Event Handlers
   */
  const setPersonae = (persona: PersonaColor[]) => {
    // Set personae to the context...
    setNewPersonae(persona)

    // Write to local storage...
    localStorage.setItem(`play-${playId}`, JSON.stringify(persona))
  }

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

  const getIsPersonaeLoaded = () => personae.length > 0

  return (
    <Provider
      value={{
        personae,
        setPlayId,
        setPersonae,
        setPersonaColor,
        getPersonaColor,
        getIsPersonaeLoaded
      }}
    >
      {children}
    </Provider>
  )
}
