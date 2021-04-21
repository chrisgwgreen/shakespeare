import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components/macro'
import { Helmet } from 'react-helmet-async'
import { StyledLink, Title, ParallaxHeader } from 'components'

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
const PageLayout = styled.div`
  width: 100%;
  height: 100%;
`

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const MenuColumn = styled.div`
  min-width: 250px;
`
const TitleWrapper = styled.div`
  margin: 1rem 0 0 1rem;
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
        <MenuColumn key={`menu-${menuItem.title}`}>
          <TitleWrapper>
            <Title text={menuItem.title} />
          </TitleWrapper>

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
        </MenuColumn>
      )
    })

  return (
    <>
      <Helmet>
        <title>Plays</title>
      </Helmet>

      <ParallaxHeader />

      <PageLayout>
        <MenuWrapper>{menu}</MenuWrapper>
      </PageLayout>
    </>
  )
}
