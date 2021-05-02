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

  console.log({ users })

  /*
   * Handle Events
   */

  const handleUpdatePersona = (
    name: string,
    color: string,
    isNewPersona = false
  ) => {
    // users.push({ name, color })
    // setUsers(users)

    // console.log('>>', name)

    // // console.log({ name, color })

    const userIndex = users.findIndex((user) => user.name === name)

    if (userIndex === -1) {
      users.push({ name, color })
      setUsers(users)
    } else {
      users[userIndex].color = color
      setUsers(users)
    }

    // TODO write to localstorage...
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
                  users={users}
                />
              )
            default:
              break
          }
        })}
    </PlayWrapper>
  )
}
