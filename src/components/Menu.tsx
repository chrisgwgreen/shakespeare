import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import { Helmet } from 'react-helmet'
import { StyledLink } from 'components'

interface MenuProps {
  title: string
  plays: Plays[]
}

interface Plays {
  title: string
  id: string
}

/*
 * Styled Components
 */
const Partition = styled.span`
  opacity: 0.5;
  text-transform: uppercase;
  font-size: 0.8125rem;
  display: block;
  padding: 0.75rem 1rem;
`

const ShakespeareImage = styled.img`
  width: 100%;
`

const MenuLinkWrapper = styled.div<{ isActive: boolean }>((props) => {
  const {
    isActive,
    theme: { color, borderColor }
  } = props

  return css`
    box-sizing: content-box;
    position: relative;
    transition: opacity 0.4s;
    text-transform: uppercase;
    font-size: 0.8125rem;
    padding: 0.75rem 1rem;
    display: flex;
    border-bottom: 1px solid transparent;

    :hover {
      border-bottom: 1px solid ${color};
    }

    ${isActive &&
    css`
      border-bottom: 1px solid ${borderColor};
    `}
  `
})

/*
 * Component
 */
export const Menu = () => {
  const [menuContent, setMenuContent] = useState<
    Record<string, unknown>
  >()

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/menu.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((response) => response.json())
      .then((menuContent) => {
        setMenuContent(menuContent)
      })
  }, [])

  const menu =
    menuContent &&
    Object.keys(menuContent).map((value) => {
      const menuItem = menuContent[value] as MenuProps

      return (
        <div key={`menu-${menuItem.title}`}>
          <Partition>{menuItem.title}</Partition>
          {menuItem.plays.map((play) => {
            const { id, title } = play

            return (
              <StyledLink
                key={`menu-project-${id}`}
                to={`/play/${id}`}
              >
                <MenuLinkWrapper isActive={false}>
                  {title}
                </MenuLinkWrapper>
              </StyledLink>
            )
          })}
        </div>
      )
    })

  return (
    <>
      <Helmet>
        <title>Menu</title>
      </Helmet>

      <ShakespeareImage
        src="https://upload.wikimedia.org/wikipedia/commons/3/36/Shakespeare_Droeshout_1623.jpg"
        alt=""
      />

      {menu}
    </>
  )
}
