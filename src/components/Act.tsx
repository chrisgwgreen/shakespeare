import React from 'react'
import styled, { css } from 'styled-components/macro'
import { NodeProps } from 'types'
import { Title, Scene } from 'components'

/*
 * Styled Components
 */
const ActWrapper = styled.div((props) => {
  const {
    theme: { borderColor }
  } = props

  return css`
    padding-top: 2rem;
    border-top: 1px solid ${borderColor};
    margin-top: 2rem;
  `
})

/*
 * Component
 */
export const Act = (props: NodeProps) => {
  const { childNodes } = props

  return (
    <ActWrapper>
      {childNodes &&
        childNodes.map((child, index) => {
          const { nodeName, childNodes, text } = child

          switch (nodeName) {
            case 'title':
              return (
                text && (
                  <Title
                    key={`act-title-${index}`}
                    text={text}
                    size="medium"
                  />
                )
              )

            case 'scene':
              return (
                <Scene
                  key={`act-scene-${index}`}
                  nodeName={nodeName}
                  childNodes={childNodes}
                />
              )

            default:
              break
          }
        })}
    </ActWrapper>
  )
}
