import React, { useEffect, useContext } from 'react'
import styled from 'styled-components/macro'
import { NodeProps, PersonaColor } from 'types'
import { Text, Persona, PersonaGroup, Accordion } from 'components'
import { PersonaeContext } from 'contexts'
import { getRandomColor } from 'utils'
/*
 * Styled Components
 */
const PersonaeContent = styled.div``

/*
 * Component
 */

export const Personae = (props: NodeProps) => {
  const { childNodes } = props

  const personaeContext = useContext(PersonaeContext)

  useEffect(() => {
    // Populate Personae context...
    const getPersonae = (childNodes: NodeProps[]): PersonaColor[] => {
      return childNodes?.reduce(
        (acc: PersonaColor[], node: NodeProps) => {
          const { nodeName, text, childNodes } = node

          if (nodeName === 'persona' && text)
            return [
              ...acc,
              {
                name: text,
                color: getRandomColor()
              }
            ]

          if (nodeName === 'pgroup' && childNodes)
            return [...acc, ...getPersonae(childNodes)]

          return acc
        },
        []
      )
    }

    if (childNodes) {
      const personaeReduce = getPersonae(childNodes)
      personaeContext?.setPersonae(personaeReduce)
    }
  }, [])

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
