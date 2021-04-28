import React from 'react'
import { NodeProps } from 'types'
import { Text, Persona } from 'components'

interface Props extends NodeProps {
  onUpdatePersona: (name: string, color: string) => void
}

/*
 * Component
 */
export const PersonaGroup = (props: Props) => {
  const { childNodes, onUpdatePersona } = props

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
