import React, { useRef, useEffect } from 'react'
import styled, { css } from 'styled-components/macro'
import { Button, Icon } from 'components'
import { findString } from 'utils'

/*
 * Styled Component
 */
const SearchWrapper = styled.div((props) => {
  const {
    theme: { background, boxShadow }
  } = props

  return css`
    position: absolute;
    right: 0;
    bottom: -4rem;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    display: flex;
    flex-direction: row;
    background: ${background};
    box-shadow: ${boxShadow};
  `
})

const StyledInput = styled.input((props) => {
  const {
    theme: { headerFont, borderColor }
  } = props

  return css`
    font-size: 1.5rem;
    width: 100%;
    max-width: 375px;
    outline: none;
    font-family: ${headerFont};
    border: 1px solid ${borderColor};
    padding: 0.5rem;
  `
})

/*
 * Component
 */
export const Search = () => {
  /*
   * Ref
   */
  const contentRef = useRef<HTMLInputElement>()

  /*
   * Event Handlers
   */
  const handleSearchClick = () => {
    if (contentRef.current) {
      findString(contentRef.current.value)
    }
  }

  /*
   * React Hooks
   */
  useEffect(() => {
    const enterPress = (event: KeyboardEvent) =>
      event.key === 'Enter' && handleSearchClick()

    window.addEventListener('keypress', enterPress)

    if (contentRef.current) contentRef.current.focus()

    return () => {
      window.addEventListener('keypress', enterPress)
    }
  }, [])

  return (
    <SearchWrapper>
      <StyledInput
        type="text"
        ref={(ref) => {
          contentRef.current = ref as HTMLInputElement
        }}
        placeholder="Search..."
      />
      <Button onClick={handleSearchClick}>
        <Icon icon="chevron-right" />
      </Button>
    </SearchWrapper>
  )
}
