import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { NodeProps } from 'types'
import { Text, Title } from 'components'
import { getSafeName } from 'utils'

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

  const [safeNameColor, setSafeNameColor] = useState<string>('#000')

  return (
    <SpeechWrapper>
      {childNodes &&
        childNodes.map((child, index) => {
          const { nodeName, text } = child

          switch (nodeName) {
            case 'speaker':
              useEffect(() => {
                if (text) {
                  const safeName = getSafeName(text)
                  const safeNameColor = localStorage.getItem(safeName)

                  safeNameColor && setSafeNameColor(safeNameColor)
                }
              }, [])

              return (
                text && (
                  <Title
                    key={`speech-speaker-${index}`}
                    text={text}
                    color={safeNameColor}
                    size="small"
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
