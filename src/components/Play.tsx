import React, { Fragment } from 'react'
import styled from 'styled-components/macro'
import { Helmet } from 'react-helmet-async'

import { NodeProps } from 'types'
import { Personae, Text, Act, PlayHeader } from 'components'

interface Props extends NodeProps {
  onUpdatePlayer: (updateId: string) => void
}

/*
 * Styled Components
 */
const PlayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin-top: 80px;
  margin-bottom: 250px;
`

/*
 * Component
 */
export const Play = (props: Props) => {
  const { childNodes, onUpdatePlayer } = props

  return (
    <PlayWrapper>
      {childNodes &&
        childNodes.map((child, index) => {
          const { nodeName, childNodes, text } = child

          switch (nodeName) {
            case 'title':
              return (
                text && (
                  <Fragment key={`play-title-${index}`}>
                    <Helmet>
                      <title>{text}</title>
                    </Helmet>
                    <PlayHeader title={text} />
                  </Fragment>
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
                  onUpdatePlayer={onUpdatePlayer}
                />
              )
            default:
              break
          }
        })}
    </PlayWrapper>
  )
}
