import React from 'react'
import styled from 'styled-components/macro'
import { NodeProps } from 'types'
import { Text, Title, SpeechTitle } from 'components'

/*
 * Styled Components
 */
const SpeechWrapper = styled.div`
  margin-top: 2rem;
`

const StageDirWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

/*
 * Component
 */
export const Speech = (props: NodeProps) => {
  const { childNodes } = props

  return (
    <SpeechWrapper>
      {childNodes &&
        childNodes.map((child, index) => {
          const { nodeName, text } = child

          switch (nodeName) {
            case 'speaker':
              return (
                text && (
                  <SpeechTitle
                    key={`scene-title-${index}`}
                    text={text}
                  />
                )
              )

            case 'line':
              return (
                text && (
                  <Text key={`speech-speaker-${index}`} text={text} />
                )
              )

            case 'stagedir':
              return (
                text && (
                  <StageDirWrapper key={`speech-stagedir-${index}`}>
                    <Title text={text} size="extra-small" />
                  </StageDirWrapper>
                )
              )

            default:
              break
          }
        })}
    </SpeechWrapper>
  )
}
