import React from 'react'
import { NodeProps, User } from 'types'
import { Text, Persona } from 'components'

interface Props extends NodeProps {
  onUpdatePersona: (
    name: string,
    color: string,
    isNewPersona?: boolean
  ) => void
  users: User[]
}

/*
 * Component
 */
export const PersonaGroup = (props: Props) => {
  const { childNodes, onUpdatePersona, users } = props

  return (
    <>
      {childNodes &&
        childNodes.map((child, index) => {
          const { nodeName, text } = child

          switch (nodeName) {
            case 'persona':
              return (
                text && (
                  <Persona
                    key={`persona-group-${index}`}
                    name={text}
                    onUpdatePersona={onUpdatePersona}
                    users={users}
                  />
                )
              )
            case 'grpdescr':
              return (
                text && (
                  <Text
                    key={`persona-group-grpdescr-${index}`}
                    text={text}
                  />
                )
              )
            default:
              break
          }
        })}
    </>
  )
}
