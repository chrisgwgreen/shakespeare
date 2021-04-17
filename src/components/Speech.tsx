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
                  <Title
                    key={`speech-stagedir-${index}`}
                    text={text}
                    size="extra-small"
                  />
                )
              )

            default:
              break
          }
        })}
    </SpeechWrapper>
  )
}
