import React from 'react'
import styled from 'styled-components/macro'
import { NodeProps, User } from 'types'
import { Speech, Title } from 'components'

interface Props extends NodeProps {
  users: User[]
}

/*
 * Styled Components
 */
const SceneWrapper = styled.div`
  margin-top: 2rem;
`

const StageDirWrapper = styled.div`
  margin-top: 1rem;
`

/*
 * Component
 */
export const Scene = (props: Props) => {
  const { childNodes, users } = props

  return (
    <SceneWrapper>
      {childNodes &&
        childNodes.map((child, index) => {
          const { nodeName, childNodes, text } = child

          switch (nodeName) {
            case 'title':
              return (
                text && (
                  <Title
                    key={`scene-title-${index}`}
                    text={text}
                    size="medium"
                  />
                )
              )

            case 'stagedir':
              return (
                text && (
                  <StageDirWrapper key={`scene-stagedir-${index}`}>
                    <Title text={text} size="extra-small" />
                  </StageDirWrapper>
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
