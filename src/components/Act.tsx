import React from 'react'
import styled, { css } from 'styled-components/macro'
import { NodeProps } from 'types'
import { Title, Scene } from 'components'

interface Props extends NodeProps {
  onUpdatePlayer: (updateId: string) => void
}

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

const ActTitleWrapper = styled.div`
  cursor: pointer;
`

/*
 * Component
 */
export const Act = (props: Props) => {
  const { childNodes, onUpdatePlayer } = props

  return (
    <ActWrapper>
      {childNodes &&
        childNodes.map((child, index) => {
          const { nodeName, childNodes, text } = child

          const handleUpdatePlayer = () => {
            text && onUpdatePlayer(text)
          }

          switch (nodeName) {
            case 'title':
              return (
                text && (
                  <ActTitleWrapper
                    key={`act-title-${index}`}
                    onClick={handleUpdatePlayer}
                  >
                    <Title text={text} size="medium" />
                  </ActTitleWrapper>
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
