import React from 'react'
import styled, { css } from 'styled-components/macro'
import { Title } from 'components'

/*
 * Styled Components
 */
const MenuHeader = styled.div`
  position: relative;
  height: 500px;
  overflow: hidden;
`

const TitleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`

const ParallaxBackground = styled.img`
  width: 100%;
  transform: translateY(-200px);
`

const MenuHeaderTorn = styled.div`
  width: 100%;
  height: 69px;
  position: absolute;
  bottom: 0;
  background-image: url('${process.env.PUBLIC_URL}/edge.png');
  background-repeat-y: no-repeat;
`

/*
 * Component
 */
export const ParallaxHeader = () => {
  return (
    <MenuHeader>
      <TitleWrapper>
        <Title text="Shakespeare" size="large" />
      </TitleWrapper>
      <ParallaxBackground
        src={`${process.env.PUBLIC_URL}/shakespeare.jpg`}
        alt=""
      />
      <MenuHeaderTorn />
    </MenuHeader>
  )
}
