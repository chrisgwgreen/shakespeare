import React from 'react'
import styled from 'styled-components/macro'

interface Props {
  text: string
}

/*
 * Styled Components
 */
const TextWrapper = styled.div``

/*
 * Component
 */
export const Text = (props: Props) => {
  const { text } = props

  return <TextWrapper>{text}</TextWrapper>
}
