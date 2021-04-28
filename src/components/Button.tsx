import React, { ReactNode } from 'react'
import styled from 'styled-components/macro'
import {} from 'components'

interface Props {
  onClick: () => void
  children: ReactNode | string
}

/*
 * Styled Components
 */
const ButtonWrapper = styled.button`
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
`

/*
 * Component
 */
export const Button = (props: Props) => {
  const { onClick, children } = props

  return <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>
}
