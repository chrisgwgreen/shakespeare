import React from 'react'
import { UserConsumer } from 'contexts'
import { UserContextProps } from 'types'
import { Title } from 'components'

interface Props {
  text: string
}

/*
 * Component
 */
export const SpeechTitle = (props: Props) => {
  const { text } = props

  return (
    <UserConsumer>
      {(context) => {
        const { getUserColor } = context as UserContextProps

        const color = getUserColor(text)

        return (
          <Title
            text={text}
            color={color || '#222222'}
            size="small"
          />
        )
      }}
    </UserConsumer>
  )
}
