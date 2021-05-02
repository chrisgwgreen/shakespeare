import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { SketchPicker, ColorResult } from 'react-color'
import { Icon } from 'components'
import { fadeInAnimation } from 'utils'
import { UserConsumer } from 'contexts'
import { UserContextProps } from 'types'

interface Props {
  name: string
}

interface PersonaProps {
  name: string
  getUserColor: (name: string) => string | null
  setUserColor: (name: string, color: string) => void
}

/*
 * Styled Components
 */
const PersonaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
`

const SketchPickerWrapper = styled.div`
  position: relative;
  padding: 2rem;
  opacity: 0;
  animation: ${fadeInAnimation} forwards 0.4s;
`

const PersonaTitleWrapper = styled.div`
  cursor: pointer;
`

const ButtonWrapper = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border: none;
  background: transparent;
  outline: none;
  cursor: pointer;
`

const PersonaComponent = (props: PersonaProps) => {
  const { name, getUserColor, setUserColor } = props

  const [
    isColorPickerVisible,
    setIsColorPickerVisible
  ] = useState<boolean>()

  const [sketchPickerColor, setSketchPickerColor] = useState<string>(
    ''
  )

  /*
   * React Hooks
   */

  useEffect(() => {
    const color = getUserColor(name)

    if (color) setSketchPickerColor(color)
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsColorPickerVisible(false)
    }

    document.addEventListener('keyup', handleEsc)

    return () => {
      document.removeEventListener('keyup', handleEsc)
    }
  }, [])

  /*
   * Event Handlers
   */
  const handleToggleColorPicker = () =>
    setIsColorPickerVisible(!isColorPickerVisible)

  const handleColorChange = (color: ColorResult) => {
    const { hex } = color

    setSketchPickerColor(hex)
  }

  const handleChangeComplete = () => {
    setUserColor(name, sketchPickerColor)
  }

  const color = isColorPickerVisible
    ? sketchPickerColor
    : getUserColor(name)

  return (
    <PersonaWrapper>
      <PersonaTitleWrapper
        style={{
          color: color || `#000`
        }}
        onClick={handleToggleColorPicker}
      >
        {name}
      </PersonaTitleWrapper>
      {isColorPickerVisible && (
        <SketchPickerWrapper>
          <ButtonWrapper onClick={handleToggleColorPicker}>
            <Icon icon="times" />
          </ButtonWrapper>
          <SketchPicker
            color={sketchPickerColor}
            onChange={handleColorChange}
            onChangeComplete={handleChangeComplete}
          />
        </SketchPickerWrapper>
      )}
    </PersonaWrapper>
  )
}

/*
 * Component
 */
export const Persona = (props: Props) => {
  const { name } = props

  return (
    <UserConsumer>
      {(context) => {
        const {
          getUserColor,
          setUserColor
        } = context as UserContextProps

        // if (!getUserColor(name)) setUserColor(name, getRandomColor())

        return (
          <PersonaComponent
            name={name}
            getUserColor={getUserColor}
            setUserColor={setUserColor}
          />
        )
      }}
    </UserConsumer>
  )
}
