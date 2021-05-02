import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components/macro'
import { NavLink } from 'react-router-dom'
import { Title, Icon, Button, Search } from 'components'

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
    z-index: 1;
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

const SearchButtonWrapper = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 1rem;
`

/*
 * Component
 */
export const PlayHeader = (props: Props) => {
  const { title } = props

  /*
   * State
   */
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  /*
   * React Hooks
   */
  useEffect(() => {
    const enterPress = (event: KeyboardEvent) =>
      event.key === 'Escape' && setIsSearchVisible(false)

    window.addEventListener('keydown', enterPress)

    return () => {
      window.removeEventListener('keydown', enterPress)
    }
  }, [])

  /*
   * Event Handler
   */
  const handleSearch = () => setIsSearchVisible(!isSearchVisible)

  return (
    <TitleWrapper>
      <HomeButtonWrapper to={`/`}>
        <Icon icon="feather-alt" />
      </HomeButtonWrapper>
      <Title text={title} size="large" />
      <SearchButtonWrapper>
        <Button onClick={handleSearch}>
          <Icon icon={isSearchVisible ? 'times' : 'search'} />
        </Button>
      </SearchButtonWrapper>
      {isSearchVisible && <Search />}
    </TitleWrapper>
  )
}
