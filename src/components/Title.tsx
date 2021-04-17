import React from 'react'
import styled, { css } from 'styled-components/macro'

type TitleSize = 'large' | 'medium' | 'small' | 'extra-small'

interface Props {
  text: string
  size?: TitleSize
  color?: string
}

/*
 * Styled Components
 */
const TitleWrapper = styled.span<{ size: TitleSize; color?: string }>(
  (props) => {
    const {
      size,
      color,
      theme: { headerFont }
    } = props

    return css`
      font-family: ${headerFont};
      display: block;

      ${size === 'large' &&
      css`
        font-size: 2rem;
      `}

      ${size === 'medium' &&
      css`
        font-size: 1.5rem;
        margin-bottom: 1rem;
      `}
      
      ${size === 'small' &&
      css`
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
      `}
      
      ${size === 'extra-small' &&
      css`
        font-size: 1rem;
      `}

    ${color &&
      css`
        color: ${color};
      `}
    `
  }
)

/*
 * Component
 */
export const Title = (props: Props) => {
  const { text, size = 'medium', color } = props

  return (
    <TitleWrapper size={size} color={color}>
      {text.toUpperCase()}
    </TitleWrapper>
  )
}
