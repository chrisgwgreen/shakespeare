import React from 'react'
import styled from 'styled-components/macro'
import { NodeProps, User } from 'types'
import { Text, Persona, PersonaGroup, Accordion } from 'components'

interface Props extends NodeProps {
  onUpdatePersona: (
    name: string,
    color: string,
    isNewPersona?: boolean
  ) => void
  users: User[]
}

/*
 * Styled Components
 */
const PersonaeContent = styled.div``

/*
 * Component
 */
export const Personae = (props: Props) => {
  const { onUpdatePersona, childNodes, users } = props

  const personaeContent =
    childNodes &&
    childNodes.map((child, index) => {
      const { nodeName, childNodes, text } = child

      switch (nodeName) {
        case 'persona':
          return (
            text && (
              <Persona
                key={`persona-${index}`}
                name={text}
                onUpdatePersona={onUpdatePersona}
                users={users}
              />
            )
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
              onUpdatePersona={onUpdatePersona}
              users={users}
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
