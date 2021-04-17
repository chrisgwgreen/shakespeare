import React from 'react'
import styled from 'styled-components/macro'
import { NodeProps } from 'types'
import { Speech, Text, Title } from 'components'

/*
 * Styled Components
 */
const SceneWrapper = styled.div`
  margin-top: 2rem;
`

/*
 * Component
 */
export const Scene = (props: NodeProps) => {
  const { childNodes } = props

  return (
    <SceneWrapper>
      {childNodes &&
        childNodes.map((child, index) => {
          const { nodeName, childNodes, text } = child

          switch (nodeName) {
            case 'title':
              return (
                text && (
                  <Text key={`scene-title-${index}`} text={text} />
                )
              )

            case 'stagedir':
              return (
                text && (
                  <Title
                    key={`scene-stagedir-${index}`}
                    text={text}
                    size="extra-small"
                  />
                )
              )

            case 'speech':
              return (
                <Speech
                  key={`scene-speech-${index}`}
                  nodeName={nodeName}
                  childNodes={childNodes}
                />
              )

            default:
              break
          }
        })}
    </SceneWrapper>
  )
}
