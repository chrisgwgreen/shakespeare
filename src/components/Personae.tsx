import React from 'react'
import styled from 'styled-components/macro'
import { NodeProps } from 'types'
import { Text, Persona, PersonaGroup, Accordion } from 'components'

/*
 * Styled Components
 */
const PersonaeContent = styled.div``

/*
 * Component
 */
export const Personae = (props: NodeProps) => {
  const { childNodes } = props

  const personaeContent =
    childNodes &&
    childNodes.map((child, index) => {
      const { nodeName, childNodes, text } = child

      switch (nodeName) {
        case 'persona':
          return (
            text && <Persona key={`persona-${index}`} name={text} />
          )

        case 'grpdescr':
          return (
            text && (
              <Text key={`persona-grpdescr-${index}`} text={text} />
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
    })

  return (
    <>
      <Accordion
        items={[
          {
            title: 'DRAMATIS PERSONAE',
            render: () => {
              return (
                <PersonaeContent>{personaeContent}</PersonaeContent>
              )
            }
          }
        ]}
      />
    </>
  )
}
