import React from 'react'
import styled, { css } from 'styled-components/macro'
import { Icon } from 'components'
import { quillAnimation, lineAnimation } from 'utils'

/*
 * Styled Components
 */
const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LoadingText = styled.div((props) => {
  const {
    theme: { headerFont }
  } = props

  return css`
    font-family: ${headerFont};
    margin-bottom: 0.5rem;
  `
})

const QuillWrapper = styled.div`
  transform-origin: 0 100%;
  animation: ${quillAnimation} infinite 0.8s;
`

const LineWrapper = styled.div`
  width: 65%;
  height: 1px;
  background: black;
  position: relative;

  :after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    left: 0;
    top: 0;

    animation: ${lineAnimation} infinite 0.8s;
  }
`

/*
 * Component
 */
export const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingText>Loading</LoadingText>
      <QuillWrapper>
        <Icon icon="feather-alt" />
      </QuillWrapper>
      <LineWrapper />
    </LoadingWrapper>
  )
}
