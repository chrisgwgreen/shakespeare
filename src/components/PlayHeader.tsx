import React from 'react'
import styled, { css } from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import { Title, Icon } from 'components'

interface Props {
  title: string
}

/*
 * Styled Components
 */
const TitleWrapper = styled.div((props) => {
  const {
    theme: { background, boxShadow }
  } = props

  return css`
    position: fixed;
    width: 100%;
    top: 0;
    padding: 1rem 0;
    background: ${background};
    box-shadow: ${boxShadow};
  `
})

const HomeButtonWrapper = styled(NavLink)`
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 1rem;
  transition: background 0.2s, fill 0.2s;

  :hover {
    background: #000;
    fill: #fff;
  }
`

/*
 * Component
 */
export const PlayHeader = (props: Props) => {
  const { title } = props

  return (
    <TitleWrapper>
      {/* <MenuHeaderTorn /> */}
      <HomeButtonWrapper to={`/`}>
        <Icon icon="feather-alt" />
      </HomeButtonWrapper>
      <Title text={title} size="large" />
    </TitleWrapper>
  )
}
