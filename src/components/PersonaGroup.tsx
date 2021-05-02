import React from 'react'
import { NodeProps } from 'types'
import { Text, Persona } from 'components'

/*
 * Component
 */
export const PersonaGroup = (props: NodeProps) => {
  const { childNodes } = props

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
