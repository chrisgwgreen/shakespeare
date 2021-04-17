import React from 'react'
import styled, { css } from 'styled-components/macro'
import { Helmet } from 'react-helmet'
import { NodeProps } from 'types'
import { Title, Personae, Text, Act } from 'components'

/*
 * Styled Components
 */
const PlayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin-top: 80px;
`

const TitleWrapper = styled.div((props) => {
  const {
    theme: { background, boxShadow }
  } = props

  return css`
    position: fixed;
    width: 100%;
    top: 0;
    padding: 1rem;
    background: ${background};
    box-shadow: ${boxShadow};
  `
})

/*
 * Component
 */
export const Play = (props: NodeProps) => {
  const { childNodes } = props

  return (
    <PlayWrapper>
      {childNodes &&
        childNodes.map((child, index) => {
          const { nodeName, childNodes, text } = child

          switch (nodeName) {
            case 'title':
              return (
                text && (
                  <>
                    <Helmet>
                      <title>{text}</title>
                    </Helmet>
                    <TitleWrapper key={`play-title-${index}`}>
                      <Title text={text} size="large" />
                    </TitleWrapper>
                  </>
                )
              )

            case 'personae':
              return (
                <Personae
                  key={`play-personae-${index}`}
                  nodeName={nodeName}
                  childNodes={childNodes}
                />
              )

            case 'scndescr':
              return (
                text && (
                  <Text key={`play-scndescr-${index}`} text={text} />
                )
              )

            case 'act':
              return (
                <Act
                  key={`play-act-${index}`}
                  nodeName={nodeName}
                  childNodes={childNodes}
                />
              )
            default:
              break
          }
        })}
    </PlayWrapper>
  )
}
