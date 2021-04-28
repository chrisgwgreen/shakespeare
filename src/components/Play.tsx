import React, { Fragment, useState } from 'react'
import styled from 'styled-components/macro'
import { Helmet } from 'react-helmet-async'
import { NodeProps, User } from 'types'
import { Personae, Title, Act, PlayHeader } from 'components'

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

const ScndescrWrapper = styled.div`
  margin-top: 2rem;
`

/*
 * Component
 */
export const Play = (props: Props) => {
  const { childNodes, onUpdatePlayer } = props

  const [users, setUsers] = useState<User[]>([])

  /*
   * Handle Events
   */

  const handleUpdatePersona = (name: string, color: string) => {
    const newUsers = [...users, { name, color }]

    setUsers(newUsers)

    console.log('>>>>', users)
  }

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
                  onUpdatePersona={handleUpdatePersona}
                  users={users}
                />
              )

            case 'scndescr':
              return (
                text && (
                  <ScndescrWrapper key={`play-scndescr-${index}`}>
                    <Title text={text} size="extra-small" />
                  </ScndescrWrapper>
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
