import React from 'react'
import { PersonaeConsumer } from 'contexts'
import { PersonaeContextProps } from 'types'
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
    <PersonaeConsumer>
      {(context) => {
        const { getPersonaColor } = context as PersonaeContextProps

        const color = getPersonaColor(text)

        return (
          <Title
            text={text}
            color={color || '#222222'}
            size="small"
          />
        )
      }}
    </PersonaeConsumer>
  )
}
