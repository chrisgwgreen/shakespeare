import React from 'react'
import { NodeProps } from 'types'
import { Title, Text, Persona, PersonaGroup } from 'components'

/*
 * Component
 */
export const Personae = (props: NodeProps) => {
  const { childNodes } = props

  return (
    <>
      {childNodes &&
        childNodes.map((child, index) => {
          const { nodeName, childNodes, text } = child

          switch (nodeName) {
            case 'title':
              return (
                text && (
                  <Title
                    key={`personae-title-${index}`}
                    text={text}
                    size="medium"
                  />
                )
              )

            case 'persona':
              return (
                text && (
                  <Persona key={`persona-${index}`} name={text} />
                )
              )

            case 'grpdescr':
              return (
                text && (
                  <Text
                    key={`persona-grpdescr-${index}`}
                    text={text}
                  />
                )
              )

            case 'pgroup':
              return (
                <PersonaGroup
                  key={`persona-group-${index}`}
                  nodeName={nodeName}
                  childNodes={childNodes}
                />
              )

            default:
              break
          }
        })}
    </>
  )
}
